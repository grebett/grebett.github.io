import MobileStackPreview from "./MobileStackPreview.astro";

const meta = {
  title: "Components/MobileStackZone",
  component: MobileStackPreview,
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export default meta;

export const ActiveStack = {};
