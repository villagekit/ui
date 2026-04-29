import type { Meta, StoryObj } from '@storybook/react'

import { Box } from '../src'
import { HoverCard } from '../src/components/HoverCard'

export default {
  component: HoverCard,
  title: 'ui/HoverCard',
} satisfies Meta<typeof HoverCard>

type Story = StoryObj<typeof HoverCard>

function ExampleContent() {
  return <Box padding="4">Hey you, hover me!</Box>
}

export const Example: Story = {
  args: {
    children: <ExampleContent />,
  },
}
