import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '../src/components/Checkbox'

const meta: Meta<typeof Checkbox.Root> = {
  component: Checkbox.Root,
  title: 'ui/Checkbox',
}

export default meta

type Story = StoryObj<typeof Checkbox.Root>

export const Base: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.HiddenInput />
        <Checkbox.Control />
        <Checkbox.Label>Checkbox label</Checkbox.Label>
      </Checkbox.Root>
    )
  },
}
