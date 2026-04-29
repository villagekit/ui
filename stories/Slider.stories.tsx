import type { Meta, StoryObj } from '@storybook/react'

import { Slider, type SliderProps } from '../src/components/Slider'

const meta: Meta<typeof Slider.Root> = {
  component: Slider.Root,
  title: 'ui/Slider',
}

export default meta

type Story = StoryObj<typeof Slider.Root>

const render = (props: SliderProps) => (
  <Slider.Root {...props}>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb index={0} />
    </Slider.Control>
  </Slider.Root>
)

export const Base: Story = {
  args: {
    max: 10,
    min: 0,
    step: 1,
    defaultValue: [5],
  },
  render,
}
