import EntryCard from "./EntryCard.astro";
import { archiveNoteEntry, roomEntry, signalEntry } from "./story-fixtures";

const meta = {
  title: "Components/EntryCard",
  component: EntryCard,
  args: {
    entry: archiveNoteEntry,
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Archive: Story = {};

export const Audio: Story = {
  args: {
    entry: signalEntry,
  },
};

export const Fiction: Story = {
  args: {
    entry: roomEntry,
  },
};
