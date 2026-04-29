import type { Meta, StoryObj } from '@storybook/react'
import { FaSearch } from 'react-icons/fa'

import { HStack } from '../src'
import { IconButton, type IconButtonProps } from '../src/components/IconButton'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['primary', 'secondary', 'tertiary', 'toolbar'] as const

export default {
  component: IconButton,
  title: 'ui/IconButton',
} satisfies Meta<typeof IconButton>

type Story = StoryObj<typeof IconButton>

export const Basic: Story = {
  args: {
    icon: <FaSearch />,
    title: 'Search',
  },
}

export const Sizes: Story = {
  render() {
    return (
      <HStack>
        {sizes.map((size) => (
          <IconButton
            key={size}
            title="Search"
            icon={<FaSearch />}
            size={size as IconButtonProps['size']}
          />
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
          <IconButton key={variant} title="Search" icon={<FaSearch />} variant={variant} />
        ))}
      </HStack>
    )
  },
}
