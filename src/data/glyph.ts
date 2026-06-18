import { fragmentColorFamilies } from "./palette";

export const getFragmentGlyph = (seed: string) => {
  const hash = [...seed].reduce(
    (total, char, index) => total + char.charCodeAt(0) * (index + 1),
    0,
  );
  const rotation = (hash % 8) * 45;
  const familyOrder = [
    fragmentColorFamilies.warm,
    fragmentColorFamilies.cold,
    fragmentColorFamilies.muted,
    fragmentColorFamilies.deepCold,
  ] as const;
  const offsets = [0, 1, 2, 3] as const;
  const colors = familyOrder.map((family, index) => {
    const colorIndex = Math.floor(hash / (index + 1) + offsets[index]) % family.length;
    return family[colorIndex];
  });

  return { colors, rotation };
};

export const getFragmentFaviconHref = (seed: string) => {
  const { colors, rotation } = getFragmentGlyph(seed);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <clipPath id="disc"><circle cx="32" cy="32" r="27"/></clipPath>
  </defs>
  <g clip-path="url(#disc)" transform="rotate(${rotation} 32 32)">
    <path d="M32 32V5a27 27 0 0 1 27 27z" fill="${colors[0]}"/>
    <path d="M32 32h27a27 27 0 0 1-27 27z" fill="${colors[1]}"/>
    <path d="M32 32v27A27 27 0 0 1 5 32z" fill="${colors[2]}"/>
    <path d="M32 32H5A27 27 0 0 1 32 5z" fill="${colors[3]}"/>
  </g>
  <circle cx="32" cy="32" r="27" fill="none" stroke="#161514" stroke-width="4"/>
  <circle cx="32" cy="32" r="20" fill="none" stroke="#f3efe6" stroke-width="5"/>
  <circle cx="32" cy="32" r="29" fill="none" stroke="#c9bfad" stroke-width="2"/>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
