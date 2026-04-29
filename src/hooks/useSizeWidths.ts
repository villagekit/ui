'use client'

import { useMemo } from 'react'
import { useTheme } from './useTheme'

export const sizeNames = [
  '3xs',
  '2xs',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
] as const
export type SizeName = (typeof sizeNames)[number]

export function useSizeWidths(): Record<SizeName, number> {
  const system = useTheme()

  return useMemo(() => {
    const get = (name: string) => parseSize(String(system.token(`sizes.${name}`) ?? '0'))
    return Object.fromEntries(sizeNames.map((name) => [name, get(name)])) as Record<
      SizeName,
      number
    >
  }, [system])
}

function parseSize(value: string): number {
  const numeric = Number.parseFloat(value)
  if (Number.isNaN(numeric)) return 0
  if (value.endsWith('rem') || value.endsWith('em')) return numeric * 16
  return numeric
}
