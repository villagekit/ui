import type { Meta, StoryObj } from '@storybook/react'

import { VStack } from '../src'
import { Link, type LinkProps } from '../src/components/Link'

export default {
  component: Link,
  title: 'ui/Link',
} satisfies Meta<typeof Link>

type Story = StoryObj<typeof Link>

const exampleHref = 'https://gridkit.nz/'
const variants = ['primary', 'secondary', 'tertiary', 'paragraph'] as const

export const Base: Story = {
  args: {
    children: 'Link goes here',
    href: exampleHref,
    target: '_blank',
  },
}

export const Variants: Story = {
  render() {
    return (
      <VStack alignItems="flex-start">
        {variants.map((variant) => (
          <Link
            key={variant}
            href={exampleHref}
            target="_blank"
            variant={variant as LinkProps['variant']}
          >
            Link with variant {variant}
          </Link>
        ))}
      </VStack>
    )
  },
}
