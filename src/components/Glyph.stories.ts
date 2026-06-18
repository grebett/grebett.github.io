import Glyph from "./Glyph.astro";

const meta = {
  title: "Components/Glyph",
  component: Glyph,
  args: {
    seed: "FRG-001",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Default: Story = {};

export const AlternateSeed: Story = {
  args: {
    seed: "SIG-017",
  },
};
