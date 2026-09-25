'use client'

import { type ElementType, type ReactNode, createContext, useContext, useMemo } from 'react'

/**
 * What the app's routing framework supplies to this package: its pathname hook and its link
 * component. The package imports no framework itself. `NavContextProvider` takes these as props
 * from a client component and fills the context; the composites that render their own anchors
 * (the nav, `Footer`, `Social`, `MdxLink`, `LinkCard`) read it as their default, while the leaf link
 * components (`Link`, `LinkButton`, `LinkIconButton`) take `as` from their caller, who holds the
 * href and knows whether it is a route. Pass the same hook on every render: the composites call
 * it as a hook, so swapping it between renders would change their hook order.
 */
export interface FrameworkProps {
  /** The router's pathname hook, such as `usePathname` from `next/navigation`. Absent, no nav item is selected. */
  usePathname?: () => string | null
  /** The router's link component, such as `Link` from `next/link`. Absent, links render as plain anchors. */
  linkComponent?: ElementType
}

/** The context's resolved value: the app's hook or the default that returns `null`, and the link component if any. */
export interface FrameworkContextValue {
  usePathname: () => string | null
  linkComponent: ElementType | undefined
}

const FrameworkContext = createContext<FrameworkContextValue>({
  usePathname: useNoPathname,
  linkComponent: undefined,
})

/** Rendered by `NavContextProvider` only, so the app has one wiring point; not a package export. */
export function FrameworkProvider(props: FrameworkProps & { children: ReactNode }) {
  const { usePathname, linkComponent, children } = props

  const value = useMemo<FrameworkContextValue>(() => {
    return { usePathname: usePathname ?? useNoPathname, linkComponent }
  }, [usePathname, linkComponent])

  return <FrameworkContext.Provider value={value}>{children}</FrameworkContext.Provider>
}

/** Outside a provider the defaults apply: no pathname, plain anchors. Never throws. */
export function useFramework(): FrameworkContextValue {
  return useContext(FrameworkContext)
}

// A stable hook for the default, so the hook order never changes when the app supplies none.
function useNoPathname(): null {
  return null
}
