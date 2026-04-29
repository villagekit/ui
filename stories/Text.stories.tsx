import type { Meta, StoryObj } from '@storybook/react'

import { Text, type TextProps } from '../src/components/Text'

const sizes = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'md', 'sm', 'xs'] as const
const variants = ['primary', 'secondary', 'tertiary'] as const

export default {
  component: Text,
  argTypes: {
    fontSize: {
      control: {
        options: sizes,
        type: 'select',
      },
    },
  },
  title: 'ui/Text',
} satisfies Meta<typeof Text>

type Story = StoryObj<typeof Text>

export const Base: Story = {
  args: {
    children: 'Text goes here',
  },
}

export const Sizes: Story = {
  render() {
    return (
      <>
        {sizes.map((size) => (
          <Text key={size} fontSize={size as TextProps['fontSize']}>
            Text with size {size}
          </Text>
        ))}
      </>
    )
  },
}

export const Variants: Story = {
  render() {
    return (
      <>
        {variants.map((variant) => (
          <Text key={variant} variant={variant}>
            Text with variant {variant}
          </Text>
        ))}
      </>
    )
  },
}
