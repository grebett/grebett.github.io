import TagFilter from "./TagFilter.astro";

const meta = {
  title: "Components/TagFilter",
  component: TagFilter,
  parameters: {
    layout: "padded",
  },
  args: {
    label: "Tags",
    name: "tag",
    values: ["archive", "fiction", "écoute", "souterrain"],
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Tags: Story = {};

export const Mediums: Story = {
  args: {
    label: "Médias",
    name: "medium",
    values: ["texte", "audio", "image", "scan"],
  },
};
