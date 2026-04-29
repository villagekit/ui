'use client'

import { type ReactNode, createContext, useContext, useMemo } from 'react'

import type { NavItemDescriptors } from './types'

interface NavContextValue {
  items: NavItemDescriptors
  topItems: NavItemDescriptors
  sideItems: NavItemDescriptors
  mobileItems: NavItemDescriptors
}

const NavContext = createContext<NavContextValue | null>(null)

export interface NavContextProviderProps {
  items: NavItemDescriptors
  children: ReactNode
}

export function NavContextProvider(props: NavContextProviderProps) {
  const { items, children } = props

  const value = useMemo<NavContextValue>(() => {
    return {
      items,
      mobileItems: items,
      topItems: items.filter((item) => item.location === 'top'),
      sideItems: items.filter((item) => item.location === 'side'),
    }
  }, [items])

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>
}

export function useNavContext(): NavContextValue {
  const value = useContext(NavContext)
  if (value == null) {
    throw new Error('useNavContext: must be used within <NavContextProvider>')
  }
  return value
}
