import GlyphIllustration from "./GlyphIllustration.astro";

const meta = {
  title: "Design/Glyph Illustration",
  component: GlyphIllustration,
  args: {
    seed: "GBT-0101",
    variant: "misprint",
    label: "GBT-0101",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["circle", "misprint", "clipped", "overprint", "fold"],
    },
  },
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Single: Story = {};
