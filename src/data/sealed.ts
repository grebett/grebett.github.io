import { fragmentColorFamilies } from "./palette";

export type SealedGlyph = {
  colors: string[];
  rotation: number;
};

export const sealedColorOptions = [...new Set(Object.values(fragmentColorFamilies).flat())];
export const sealedRotations = [0, 45, 90, 135, 180, 225, 270, 315] as const;

export const normalizeSealedGlyph = (glyph: SealedGlyph): SealedGlyph => ({
  colors: [0, 1, 2, 3].map((index) => (glyph.colors[index] ?? sealedColorOptions[index] ?? "#000000").toLowerCase()),
  rotation: ((glyph.rotation % 360) + 360) % 360,
});

export const getSealedPassphrase = (glyphs: SealedGlyph[]) =>
  glyphs
    .map((glyph) => {
      const normalized = normalizeSealedGlyph(glyph);
      return `${normalized.rotation}:${normalized.colors.join(",")}`;
    })
    .join("|");
