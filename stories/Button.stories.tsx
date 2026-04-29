import type { Meta, StoryObj } from '@storybook/react'
import { FaSearch } from 'react-icons/fa'

import { HStack, Icon } from '../src'
import { Button, type ButtonProps } from '../src/components/Button'

const meta: Meta<ButtonProps> = {
  component: Button,
  title: 'ui/Button',
}

export default meta

type Story = StoryObj<typeof Button>

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['primary', 'secondary', 'tertiary', 'toolbar'] as const

export const Basic: Story = {
  args: {
    children: 'Button',
  },
}

export const WithIcon: Story = {
  render() {
    return (
      <Button>
        <Icon>
          <FaSearch />
        </Icon>
        Button
      </Button>
    )
  },
}

export const Sizes: Story = {
  render() {
    return (
      <HStack>
        {sizes.map((size) => (
          <Button key={size} size={size}>
            Button {size}
          </Button>
        ))}
      </HStack>
    )
  },
}

export const Variants: Story = {
  render() {
    return (
      <HStack>
        {variants.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </Button>
        ))}
      </HStack>
    )
  },
}
