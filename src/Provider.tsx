'use client'

import { ChakraProvider } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { system } from './theme'

export interface ProviderProps {
  children: ReactNode
}

export function Provider(props: ProviderProps) {
  return <ChakraProvider value={system}>{props.children}</ChakraProvider>
}
