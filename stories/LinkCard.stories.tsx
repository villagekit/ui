import { Box } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { FaIceCream } from 'react-icons/fa'

import { LinkCard } from '../src/components/LinkCard'

const meta: Meta<typeof LinkCard> = {
  component: LinkCard,
  title: 'ui/LinkCard',
  decorators: [
    (Story) => (
      <Box width="3xs">
        <Story />
      </Box>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof LinkCard>

const exampleHref = 'https://gridbeam.xyz/'

export const WithIcon: Story = {
  args: {
    description: 'Description text — a sentence or two.',
    href: exampleHref,
    icon: <FaIceCream />,
    isExternal: true,
    title: 'Title',
  },
}

export const WithoutIcon: Story = {
  args: {
    description: 'Description text — a sentence or two.',
    href: exampleHref,
    isExternal: true,
    title: 'Title',
  },
}
