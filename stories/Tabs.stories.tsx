import type { Meta, StoryObj } from '@storybook/react'

import { Tabs } from '../src/components/Tabs'

export default {
  component: Tabs.Root,
  title: 'ui/Tabs',
} satisfies Meta<typeof Tabs.Root>

type Story = StoryObj<typeof Tabs.Root>

export const Example: Story = {
  render() {
    return (
      <Tabs.Root defaultValue="one" size="lg">
        <Tabs.List>
          <Tabs.Trigger value="one">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="two">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="three">Tab 3</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="one">First tab panel</Tabs.Content>
        <Tabs.Content value="two">Second tab panel</Tabs.Content>
        <Tabs.Content value="three">Third tab panel</Tabs.Content>
      </Tabs.Root>
    )
  },
}
