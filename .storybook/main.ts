import type { StorybookConfig } from "@storybook-astro/framework";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  framework: {
    name: "@storybook-astro/framework",
    options: {},
  },
  async viteFinal(viteConfig) {
    return {
      ...viteConfig,
      cacheDir: ".storybook/.vite",
      optimizeDeps: {
        ...viteConfig.optimizeDeps,
        force: true,
      },
      server: {
        ...viteConfig.server,
        host: "127.0.0.1",
        hmr: {
          ...(
            typeof viteConfig.server?.hmr === "object" && viteConfig.server.hmr !== null
              ? viteConfig.server.hmr
              : {}
          ),
          host: "127.0.0.1",
          clientPort: 6006,
        },
      },
    };
  },
};

export default config;
