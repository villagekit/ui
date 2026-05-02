import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {
      nextConfigPath: '.storybook/next.config.js',
    },
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
}
export default config
