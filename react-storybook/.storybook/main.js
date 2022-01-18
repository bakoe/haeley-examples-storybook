module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "storybook-builder-vite"
  },
  webpackFinal: async (config, { configType }) => {
    config.output.publicPath = '/haeley-examples-storybook/storybook-static/';
    return config;
  },
  managerWebpack: async (config) => {
    config.output.publicPath = '/haeley-examples-storybook/storybook-static/';
    return config;
  },
}