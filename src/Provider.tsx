'use client'

import { ChakraProvider, type SystemContext } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { Toaster } from './Toaster'
import { system as defaultSystem } from './theme'

export interface ProviderProps {
  children: ReactNode
  /**
   * The Chakra system to mount, for an app that extends the package's `config` with its own
   * fonts or tokens (`createSystem(defaultConfig, config, ...)`); the package's own by default.
   */
  system?: SystemContext
}

/** Mounts Chakra with the Village Kit system and the toast regions, as the 0.9.0 provider did. */
export function Provider(props: ProviderProps) {
  const { children, system = defaultSystem } = props

  return (
    <ChakraProvider value={system}>
      {children}
      <Toaster />
    </ChakraProvider>
  )
}
