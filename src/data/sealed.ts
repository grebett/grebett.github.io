import { fragmentColorFamilies } from "./palette";

export type SealedGlyph = {
  colors: string[];
};

export const sealedColorOptions = [...new Set(Object.values(fragmentColorFamilies).flat())];

export const normalizeSealedGlyph = (glyph: SealedGlyph): SealedGlyph => ({
  colors: [0, 1, 2, 3].map((index) => (glyph.colors[index] ?? sealedColorOptions[index] ?? "#000000").toLowerCase()),
});

export const getSealedPassphrase = (glyphs: SealedGlyph[]) =>
  glyphs
    .map((glyph) => {
      const normalized = normalizeSealedGlyph(glyph);
      return normalized.colors.join(",");
    })
    .join("|");
