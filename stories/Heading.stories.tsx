import type { Meta, StoryObj } from '@storybook/react'

import { Heading, type HeadingProps } from '../src/components/Heading'

const sizes = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const

export default {
  component: Heading,
  argTypes: {
    size: {
      control: {
        options: sizes,
        type: 'select',
      },
    },
  },
  title: 'ui/Heading',
} satisfies Meta<typeof Heading>

type Story = StoryObj<typeof Heading>

export const Base: Story = {
  args: {
    children: 'Heading',
  },
}

export const Sizes: Story = {
  render() {
    return (
      <>
        {sizes.map((size) => (
          <Heading key={size} size={size as HeadingProps['size']}>
            Heading {size}
          </Heading>
        ))}
      </>
    )
  },
}
