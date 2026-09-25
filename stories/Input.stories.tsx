import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '../src'
import { Input } from '../src/components/Input'

export default {
  component: Input,
  title: 'ui/Input',
} satisfies Meta<typeof Input>

type Story = StoryObj<typeof Input>

export const Base: Story = {}

export const WithPlaceholder: Story = {
  args: {
    placeholder: 'Placeholder text...',
  },
}

const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Sizes: Story = {
  render() {
    return (
      <VStack alignItems="flex-start">
        {sizes.map((size) => (
          <Input key={size} size={size} placeholder={`Input ${size}`} />
        ))}
      </VStack>
    )
  },
}
