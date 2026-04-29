'use client'

import { useBreakpointValue } from '@chakra-ui/react'

export function useIsMobile(): boolean {
  return useBreakpointValue<boolean>(
    {
      base: true,
      md: false,
    },
    { fallback: 'md' },
  ) as boolean
}
