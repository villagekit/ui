import type { Preview } from '@storybook/nextjs-vite'
import type { ReactElement } from 'react'
import { Provider } from '../src/Provider'

const preview: Preview = {
  decorators: [(Story) => <Provider>{Story() as ReactElement}</Provider>],
  parameters: {
    a11y: {
      test: 'todo',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    viewport: {
      options: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '800px' } },
        wide: { name: 'Wide', styles: { width: '1920px', height: '1080px' } },
      },
    },
  },
  initialGlobals: {
    viewport: { value: 'desktop' },
  },
}

export default preview
