import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const entryTypes = [
  "fragment",
  "note",
  "image",
  "audio",
  "game",
  "archive",
  "scan",
  "fiction",
  "research",
] as const;

const entries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/entries" }),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    type: z.enum(entryTypes),
    medium: z.array(z.string()).default(["text"]),
    tags: z.array(z.string()).default([]),
    excerpt: z.string(),
    cover: z.string().optional(),
    audio: z.string().optional(),
    status: z.enum(["public", "sealed", "draft"]).default("public"),
    related: z.array(z.string()).default([]),
    stack: z
      .object({
        id: z.string(),
        target: z.string(),
        required: z.array(z.string()),
      })
      .optional(),
    stacks: z
      .array(
        z.object({
          id: z.string(),
          target: z.string(),
          required: z.array(z.string()),
        }),
      )
      .optional(),
  }),
});

export const collections = { entries };
