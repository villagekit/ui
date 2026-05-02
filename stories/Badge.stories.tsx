import type { Meta, StoryObj } from '@storybook/react'

import { HStack } from '../src'
import { Badge, type BadgeProps } from '../src/components/Badge'

const meta: Meta<BadgeProps> = {
  component: Badge,
  title: 'ui/Badge',
}

export default meta

type Story = StoryObj<typeof Badge>

const variants = ['solid', 'subtle', 'outline', 'surface', 'plain'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const

export const Basic: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render() {
    return (
      <HStack>
        {variants.map((variant) => (
          <Badge key={variant} variant={variant}>
            {variant}
          </Badge>
        ))}
      </HStack>
    )
  },
}

export const Sizes: Story = {
  render() {
    return (
      <HStack>
        {sizes.map((size) => (
          <Badge key={size} size={size}>
            {size}
          </Badge>
        ))}
      </HStack>
    )
  },
}

export const ColorPalette: Story = {
  render() {
    return (
      <HStack flexWrap="wrap">
        <Badge colorPalette="primary">primary</Badge>
        <Badge colorPalette="accentA">accentA</Badge>
        <Badge colorPalette="accentB">accentB</Badge>
        <Badge colorPalette="green">green</Badge>
        <Badge colorPalette="red">red</Badge>
      </HStack>
    )
  },
}
