import type { Preview } from '@storybook/react-webpack5'
import type { ReactElement } from 'react'
import { Provider } from '../src/Provider'

const preview: Preview = {
  decorators: [(Story) => <Provider>{Story() as ReactElement}</Provider>],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
