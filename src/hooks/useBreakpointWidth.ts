'use client'

import { useBreakpointValue } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTheme } from './useTheme'

export const breakpointNames = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const
export type BreakpointName = (typeof breakpointNames)[number]

export function useBreakpointWidths(): Record<BreakpointName, number> {
  const system = useTheme()
  return useMemo(() => {
    const get = (name: string) => parseLength(String(system.token(`breakpoints.${name}`) ?? '0'))
    return {
      base: 0,
      sm: get('sm'),
      md: get('md'),
      lg: get('lg'),
      xl: get('xl'),
      '2xl': get('2xl'),
    }
  }, [system])
}

export function useBreakpointWidth(): number {
  const breakpointWidths = useBreakpointWidths()
  return useBreakpointValue<number>(breakpointWidths) as number
}

function parseLength(value: string): number {
  const numeric = Number.parseFloat(value)
  if (Number.isNaN(numeric)) return 0
  if (value.endsWith('rem') || value.endsWith('em')) return numeric * 16
  return numeric
}
