import type { Meta, StoryObj } from '@storybook/react'
import { FaLink } from 'react-icons/fa'

import { HStack } from '../src'
import { LinkIconButton, type LinkIconButtonProps } from '../src/components/LinkIconButton'

export default {
  component: LinkIconButton,
  title: 'ui/LinkIconButton',
} satisfies Meta<typeof LinkIconButton>

type Story = StoryObj<typeof LinkIconButton>

const exampleHref = 'https://gridkit.nz/'
const variants = ['primary', 'secondary', 'tertiary', 'toolbar'] as const

export const Base: Story = {
  args: {
    href: exampleHref,
    icon: <FaLink />,
    isExternal: true,
  },
}

export const Variants: Story = {
  render() {
    return (
      <HStack>
        {variants.map((variant) => (
          <LinkIconButton
            key={variant}
            href={exampleHref}
            isExternal
            title="Link"
            icon={<FaLink />}
            variant={variant as LinkIconButtonProps['variant']}
          />
        ))}
      </HStack>
    )
  },
}
