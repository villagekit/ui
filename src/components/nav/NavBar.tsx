'use client'

import { HStack, type StackProps } from '@chakra-ui/react'

import { useFramework } from '../../framework'
import { NavLink, type NavLinkProps } from '../NavLink'
import type { NavItemDescriptors } from './types'

export interface NavBarProps {
  items: NavItemDescriptors
  linkSize?: NavLinkProps['size']
  onHideMobileMenu?: () => void
  container?: StackProps
}

export function NavBar(props: NavBarProps) {
  const { items, linkSize = 'md', onHideMobileMenu, container } = props

  const { usePathname, linkComponent } = useFramework()
  const pathname = usePathname()

  return (
    <HStack {...container}>
      {items.map(({ label, href }) => (
        <NavLink
          key={href}
          as={linkComponent}
          href={href}
          isSelected={href === pathname}
          size={linkSize}
          onClick={onHideMobileMenu}
        >
          {label}
        </NavLink>
      ))}
    </HStack>
  )
}
