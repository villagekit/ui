import type { Meta, StoryObj } from '@storybook/react'

import { Accordion } from '../src/components/Accordion'

const meta: Meta<typeof Accordion.Root> = {
  component: Accordion.Root,
  title: 'ui/Accordion',
}

export default meta

type Story = StoryObj<typeof Accordion.Root>

export const Example: Story = {
  render() {
    return (
      <Accordion.Root multiple collapsible>
        <Accordion.Item value="one">
          <Accordion.ItemTrigger>
            Item 1
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>Content goes here</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>

        <Accordion.Item value="two">
          <Accordion.ItemTrigger>
            Item 2
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>More content goes here</Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      </Accordion.Root>
    )
  },
}
