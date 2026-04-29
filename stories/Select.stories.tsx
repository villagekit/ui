import type { Meta, StoryObj } from '@storybook/react'

import { Select } from '../src/components/Select'

export default {
  component: Select.Root,
  title: 'ui/Select',
} satisfies Meta<typeof Select.Root>

type Story = StoryObj<typeof Select.Root>

export const Example: Story = {
  render() {
    return (
      <Select.Root>
        <Select.Field>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
        </Select.Field>
        <Select.Indicator />
      </Select.Root>
    )
  },
}
