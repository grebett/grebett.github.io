import EntryGrid from "./EntryGrid.astro";
import { entries, stackEntries } from "./story-fixtures";

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
  parameters?: Record<string, unknown>;
};

export const Populated: Story = {};

export const Empty: Story = {
  args: {
    entries: [],
  },
};

export const StackParticipants: Story = {
  args: {
    entries: stackEntries,
  },
};

export const Mobile: Story = {
  args: {
    entries: stackEntries,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
