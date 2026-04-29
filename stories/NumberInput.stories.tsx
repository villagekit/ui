import type { Meta, StoryObj } from '@storybook/react'

import { NumberInput, type NumberInputProps } from '../src/components/NumberInput'

export default {
  component: NumberInput.Root,
  title: 'ui/NumberInput',
} satisfies Meta<typeof NumberInput.Root>

type Story = StoryObj<typeof NumberInput.Root>

const renderBase = (props: NumberInputProps) => (
  <NumberInput.Root {...props}>
    <NumberInput.Input />
  </NumberInput.Root>
)

export const Base: Story = {
  render: renderBase,
}

const renderStepper = (props: NumberInputProps) => (
  <NumberInput.Root {...props}>
    <NumberInput.Input />
    <NumberInput.Control>
      <NumberInput.IncrementTrigger />
      <NumberInput.DecrementTrigger />
    </NumberInput.Control>
  </NumberInput.Root>
)

export const WithStepper: Story = {
  render: renderStepper,
}

export const WithRange: Story = {
  args: {
    max: 100,
    min: 0,
  },
  render: renderStepper,
}
