import type { Meta, StoryObj } from '@storybook/react'

import { Footer, type FooterProps, Text } from '../src'

const meta: Meta<FooterProps> = {
  component: Footer,
  title: 'ui/Footer',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Footer>

const sections = [
  {
    heading: 'Browse',
    links: [
      { href: '/designs', label: 'Designs' },
      { href: '/stories', label: 'Stories' },
      { href: '/suppliers', label: 'Suppliers' },
    ],
  },
  {
    heading: 'Tools',
    links: [
      { href: '/tools/cutting-planner', label: 'Cutting planner' },
      { href: '/tools-and-resources', label: 'Tools & resources' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
    ],
  },
]

export const Basic: Story = {
  args: { sections },
}

export const WithChildren: Story = {
  render() {
    return (
      <Footer sections={sections}>
        <Text fontSize="sm" color="gray.700" textAlign="center">
          gridbeam.xyz — open-source educational site about grid beam construction.
        </Text>
      </Footer>
    )
  },
}
