import GlyphIllustrationGallery from "./GlyphIllustrationGallery.astro";

const meta = {
  title: "Design/Glyph Illustration Gallery",
  component: GlyphIllustrationGallery,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Gallery: Story = {};
