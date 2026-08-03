import type { Meta, StoryObj } from '@storybook/react'
import NextLink from 'next/link'

import { HStack } from '../src'
import { LinkButton, type LinkButtonProps } from '../src/components/LinkButton'

export default {
  component: LinkButton,
  title: 'ui/LinkButton',
} satisfies Meta<typeof LinkButton>

type Story = StoryObj<typeof LinkButton>

const exampleHref = 'https://gridkit.nz/'
const variants = ['primary', 'secondary', 'tertiary', 'toolbar'] as const

export const Base: Story = {
  args: {
    children: 'Link goes here',
    href: exampleHref,
    isExternal: true,
  },
}

// Guards the 1.2.0 fix: `as` used to be swallowed by Button's `asChild`, silently turning every
// internal link back into a full document load. Inspect the DOM — the anchor must be NextLink's.
export const AsNextLink: Story = {
  args: {
    as: NextLink,
    children: 'Client-side navigation',
    href: '/designs',
  },
}

export const Variants: Story = {
  render() {
    return (
      <HStack>
        {variants.map((variant) => (
          <LinkButton
            key={variant}
            href={exampleHref}
            isExternal
            variant={variant as LinkButtonProps['variant']}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </LinkButton>
        ))}
      </HStack>
    )
  },
}
