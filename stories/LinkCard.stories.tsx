import type { Meta, StoryObj } from '@storybook/react'
import NextLink from 'next/link'
import { FaIceCream } from 'react-icons/fa'

import { LinkCard } from '../src/components/LinkCard'

const meta: Meta<typeof LinkCard> = {
  component: LinkCard,
  title: 'ui/LinkCard',
}

export default meta

type Story = StoryObj<typeof LinkCard>

const exampleHref = 'https://gridbeam.xyz/'

export const External: Story = {
  args: {
    description: 'Description text, a sentence or two.',
    href: exampleHref,
    icon: FaIceCream,
    isExternal: true,
    title: 'Title',
  },
}

// Guards the 1.2.0 fix: `linkComponent` routes the overlay anchor through a framework link.
// Inspect the DOM: the `.chakra-linkbox__overlay` anchor must be NextLink's.
export const WithLinkComponent: Story = {
  args: {
    description: 'Internal link, navigated client-side.',
    href: '/designs',
    icon: FaIceCream,
    linkComponent: NextLink,
    title: 'Title',
  },
}
