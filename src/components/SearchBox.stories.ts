import SearchBox from "./SearchBox.astro";

const meta = {
  title: "Components/SearchBox",
  component: SearchBox,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
};

export const Default: Story = {};
