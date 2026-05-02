import type { Meta, StoryObj } from '@storybook/react'

import { NavBar, NavContextProvider, NavList } from '../src/components/nav'
import type { NavItemDescriptors } from '../src/components/nav/types'

const meta: Meta = {
  title: 'ui/Nav/NavBar',
}

export default meta

type Story = StoryObj

const items: NavItemDescriptors = [
  { label: 'Designs', href: '/designs', location: 'top' },
  { label: 'Stories', href: '/stories', location: 'top' },
  { label: 'Tools', href: '/tools-and-resources', location: 'top' },
  { label: 'Suppliers', href: '/suppliers', location: 'top' },
  { label: 'About', href: '/about', location: 'side' },
]

const topItems = items.filter((item) => item.location === 'top')

export const Basic: Story = {
  render() {
    return (
      <NavContextProvider items={items}>
        <NavBar items={topItems} />
      </NavContextProvider>
    )
  },
}

export const AsList: Story = {
  render() {
    return (
      <NavContextProvider items={items}>
        <NavList items={items} gap="2" />
      </NavContextProvider>
    )
  },
}
