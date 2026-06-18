import EntryGrid from "./EntryGrid.astro";
import { entries } from "./story-fixtures";

const meta = {
  title: "Components/EntryGrid",
  component: EntryGrid,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    entries,
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Populated: Story = {};

export const Empty: Story = {
  args: {
    entries: [],
  },
};
