import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import { HStack, VStack } from '../src'
import { NavLink, type NavLinkProps } from '../src/components/NavLink'

export default {
  component: NavLink,
  title: 'ui/NavLink',
} satisfies Meta<typeof NavLink>

type Story = StoryObj<typeof NavLink>

const exampleHref = 'https://gridkit.nz/'
const sizes = ['xl', 'lg', 'md', 'sm', 'xs'] as const
const variants = ['heading', 'text'] as const

export const Base: Story = {
  args: {
    children: 'Item 1',
    href: exampleHref,
    target: '_blank',
  },
}

export const Multiple: Story = {
  render() {
    const [selectedItem, setSelectedItem] = useState('Item 1')

    const items = ['Item 1', 'Item 2', 'Item 3']

    return (
      <HStack gap="4">
        {items.map((item) => (
          <NavLink
            key={item}
            isSelected={selectedItem === item}
            onClick={() => setSelectedItem(item)}
            href={exampleHref}
            target="_blank"
          >
            {item}
          </NavLink>
        ))}
      </HStack>
    )
  },
}

export const Sizes: Story = {
  render() {
    return (
      <VStack alignItems="flex-start">
        {sizes.map((size) => (
          <NavLink key={size} size={size as NavLinkProps['size']}>
            NavLink {size}
          </NavLink>
        ))}
      </VStack>
    )
  },
}

export const Variants: Story = {
  render() {
    return (
      <VStack alignItems="flex-start">
        {variants.map((variant) => (
          <NavLink key={variant} variant={variant as NavLinkProps['variant']}>
            NavLink with variant {variant}
          </NavLink>
        ))}
      </VStack>
    )
  },
}
