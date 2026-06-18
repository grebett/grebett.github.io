import GlyphMatrix from "./GlyphMatrix.astro";

const meta = {
  title: "Components/Glyph",
  component: GlyphMatrix,
  parameters: {
    layout: "padded",
  },
  args: {
    count: 100,
    columns: 10,
    prefix: "FRG",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const First100Fragments: Story = {};
