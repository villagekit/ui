import type { Meta, StoryObj } from '@storybook/react'

import { Switch } from '../src/components/Switch'

const meta: Meta<typeof Switch.Root> = {
  component: Switch.Root,
  title: 'ui/Switch',
}

export default meta

type Story = StoryObj<typeof Switch.Root>

export const Base: Story = {
  render() {
    return (
      <Switch.Root>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Switch label</Switch.Label>
      </Switch.Root>
    )
  },
}
