import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { createCipheriv, pbkdf2Sync, randomBytes } from "node:crypto";
import { getFragmentGlyph } from "../../data/glyph";
import { getSealedPassphrase, type SealedGlyph } from "../../data/sealed";

type StackRecipe = {
  id: string;
  target: string;
  required: string[];
};

const iterations = 150_000;

const getEntryRecipes = (entry: Awaited<ReturnType<typeof getCollection<"entries">>>[number]) =>
  entry.data.stacks ?? (entry.data.stack ? [entry.data.stack] : []);

const getRecipeGlyphs = (
  recipe: StackRecipe,
  entriesBySlug: Map<string, Awaited<ReturnType<typeof getCollection<"entries">>>[number]>,
): SealedGlyph[] =>
  recipe.required.map((slug) => {
    const seed = entriesBySlug.get(slug)?.data.id ?? slug;
    return getFragmentGlyph(seed);
  });

const encryptPayload = (payload: unknown, passphrase: string, slots: number) => {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = pbkdf2Sync(passphrase, salt, iterations, 32, "sha256");
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(JSON.stringify(payload), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    version: 1,
    kdf: "PBKDF2-SHA-256",
    cipher: "AES-GCM",
    slots,
    iterations,
    salt: salt.toString("base64"),
    iv: iv.toString("base64"),
    ciphertext: Buffer.concat([ciphertext, tag]).toString("base64"),
  };
};

export async function getStaticPaths() {
  const entries = await getCollection("entries", ({ data }) => data.status !== "draft");
  return entries
    .filter((entry) => entry.data.status === "sealed")
    .map((entry) => ({
      params: { slug: entry.id },
      props: { entry },
    }));
}

export const GET: APIRoute = async ({ props }) => {
  const entry = props.entry as Awaited<ReturnType<typeof getCollection<"entries">>>[number];
  const publicEntries = await getCollection("entries", ({ data }) => data.status === "public");
  const entriesBySlug = new Map(publicEntries.map((publicEntry) => [publicEntry.id, publicEntry]));
  const recipe = publicEntries.flatMap(getEntryRecipes).find((item) => item.target === entry.id);

  if (!recipe) return new Response("No stack recipe for sealed entry", { status: 404 });

  const payload = {
    id: entry.data.id,
    slug: entry.id,
    title: entry.data.title,
    excerpt: entry.data.excerpt,
    date: entry.data.date.toISOString(),
    type: entry.data.type,
    medium: entry.data.medium,
    tags: entry.data.tags,
    body: entry.body,
  };

  const glyphs = getRecipeGlyphs(recipe, entriesBySlug);

  return new Response(JSON.stringify(encryptPayload(payload, getSealedPassphrase(glyphs), glyphs.length)), {
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
  });
};
