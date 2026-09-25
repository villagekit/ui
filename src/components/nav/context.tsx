'use client'

import { type ReactNode, createContext, useContext, useMemo } from 'react'

import { type FrameworkProps, FrameworkProvider } from '../../framework'
import type { NavItemDescriptors } from './types'

interface NavContextValue {
  items: NavItemDescriptors
  topItems: NavItemDescriptors
  sideItems: NavItemDescriptors
  mobileItems: NavItemDescriptors
}

const NavContext = createContext<NavContextValue | null>(null)

export interface NavContextProviderProps extends FrameworkProps {
  items: NavItemDescriptors
  children: ReactNode
}

/**
 * The app's one wiring point for the nav: its items, and the framework's pathname hook and link
 * component (`FrameworkProps`), which the nav, `Footer`, `MdxLink` and `LinkCard` read. Render it
 * from a client component, since a hook cannot cross a server component boundary as a prop.
 */
export function NavContextProvider(props: NavContextProviderProps) {
  const { items, usePathname, linkComponent, children } = props

  const value = useMemo<NavContextValue>(() => {
    return {
      items,
      mobileItems: items,
      topItems: items.filter((item) => item.location === 'top'),
      sideItems: items.filter((item) => item.location === 'side'),
    }
  }, [items])

  return (
    <FrameworkProvider usePathname={usePathname} linkComponent={linkComponent}>
      <NavContext.Provider value={value}>{children}</NavContext.Provider>
    </FrameworkProvider>
  )
}

export function useNavContext(): NavContextValue {
  const value = useContext(NavContext)
  if (value == null) {
    throw new Error('useNavContext: must be used within <NavContextProvider>')
  }
  return value
}
