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
  parameters?: Record<string, unknown>;
};

export const Tags: Story = {};

export const Mediums: Story = {
  args: {
    label: "Médias",
    name: "medium",
    values: ["texte", "audio", "image", "scan"],
  },
};

export const MobileClosed: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const MobileOpen: Story = {
  args: {
    open: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const MobileWithActiveFilters: Story = {
  args: {
    open: true,
    activeCount: 2,
    checkedValues: ["archive", "écoute"],
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
