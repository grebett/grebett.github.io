import SealedEntryPreview from "./SealedEntryPreview.astro";

const meta = {
  title: "Components/SealedEntry",
  component: SealedEntryPreview,
  parameters: {
    layout: "padded",
  },
  args: {
    state: "locked",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
};

export const Locked: Story = {};

export const KeyAvailable: Story = {
  args: {
    state: "ready",
  },
};

export const Decrypting: Story = {
  args: {
    state: "decrypting",
  },
};

export const Error: Story = {
  args: {
    state: "error",
  },
};

export const Revealed: Story = {
  args: {
    state: "revealed",
  },
};

export const MobileRevealed: Story = {
  args: {
    state: "revealed",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
