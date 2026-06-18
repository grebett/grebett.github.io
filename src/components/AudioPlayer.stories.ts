import AudioPlayer from "./AudioPlayer.astro";

const meta = {
  title: "Components/AudioPlayer",
  component: AudioPlayer,
  args: {
    src: "/audio/signal-17.mp3",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Default: Story = {};
