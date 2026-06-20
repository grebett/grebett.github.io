import ColorPickerPreview from "./ColorPickerPreview.astro";

const meta = {
  title: "Design/Color Picker",
  component: ColorPickerPreview,
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = {
  args?: Record<string, unknown>;
  parameters?: Record<string, unknown>;
};

export const FragmentInks: Story = {};
