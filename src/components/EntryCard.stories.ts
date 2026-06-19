import EntryCard from "./EntryCard.astro";
import {
  archiveNoteEntry,
  roomEntry,
  signalEntry,
  stackArchiveEntry,
} from "./story-fixtures";

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
  parameters?: Record<string, unknown>;
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

export const StackParticipant: Story = {
  args: {
    entry: stackArchiveEntry,
  },
};

export const DropTarget: Story = {
  args: {
    entry: stackArchiveEntry,
    stateClass: "is-drop-target",
  },
};

export const DropRejected: Story = {
  args: {
    entry: stackArchiveEntry,
    stateClass: "is-drop-rejected",
  },
};

export const StackedTop: Story = {
  args: {
    entry: stackArchiveEntry,
    stateClass: "is-stacked is-stack-top",
    style: {
      "--stack-z": "8",
      "--stack-rotation": "-1deg",
    },
  },
};

export const MobileStackParticipant: Story = {
  args: {
    entry: stackArchiveEntry,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
