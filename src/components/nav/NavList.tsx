'use client'

import { List, type ListRootProps } from '@chakra-ui/react'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'

import { NavLink, type NavLinkProps } from '../NavLink'
import type { NavItemDescriptors, NavSubItemDescriptors } from './types'

export interface NavListProps {
  items: NavItemDescriptors | NavSubItemDescriptors
  linkSize?: NavLinkProps['size']
  onHideMobileMenu?: () => void
  containerProps?: ListRootProps
  listProps?: ListRootProps
  gap?: ListRootProps['gap']
  depth?: number
}

export function NavList(props: NavListProps) {
  const {
    items,
    linkSize = 'md',
    onHideMobileMenu,
    containerProps,
    listProps,
    gap,
    depth = 0,
  } = props

  const pathname = usePathname()

  return (
    <List.Root listStyle="none" {...containerProps} {...listProps} gap={gap}>
      {items.map(({ label, href, children }) => (
        <List.Item key={href}>
          <NavLink
            as={NextLink}
            href={href}
            isSelected={href === pathname}
            size={linkSize}
            onClick={onHideMobileMenu}
          >
            {label}
          </NavLink>

          {children != null && (
            <NavList
              items={children}
              linkSize={linkSize}
              onHideMobileMenu={onHideMobileMenu}
              depth={depth + 1}
              containerProps={{
                borderColor: 'gray.400',
                borderLeftWidth: '1px',
                borderStyle: 'solid',
                ml: 1,
                mt: gap,
                pl: 3,
              }}
              listProps={listProps}
              gap={gap}
            />
          )}
        </List.Item>
      ))}
    </List.Root>
  )
}
