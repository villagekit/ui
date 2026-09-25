'use client'

import { useMemo } from 'react'
import { useTheme } from './useTheme'

/** The size names a `sizes` prop may use: the 0.9.0 names, `full` and the v2 container widths among them. */
export const sizeNames = [
  'full',
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
  'container.sm',
  'container.md',
  'container.lg',
  'container.xl',
] as const
export type SizeName = (typeof sizeNames)[number]

// Chakra v2's `sizes.container.md` to `xl` are v3's `sizes.breakpoint-*`, registered from the
// breakpoints; v2's `container.sm` (640px) has no v3 token, since v3's `sm` breakpoint is 480px.
const containerSm = 640
const sizeTokens: Record<Exclude<SizeName, 'container.sm'>, string> = {
  full: 'full',
  '3xs': '3xs',
  '2xs': '2xs',
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  '2xl': '2xl',
  '3xl': '3xl',
  '4xl': '4xl',
  '5xl': '5xl',
  '6xl': '6xl',
  '7xl': '7xl',
  '8xl': '8xl',
  'container.md': 'breakpoint-md',
  'container.lg': 'breakpoint-lg',
  'container.xl': 'breakpoint-xl',
}

/** Each size name's width in pixels, `full` as `100%`, read from the system's `sizes` tokens. */
export function useSizeWidths(): Record<SizeName, number | '100%'> {
  const system = useTheme()

  return useMemo(() => {
    const get = (name: SizeName) =>
      name === 'container.sm'
        ? containerSm
        : parseSize(String(system.token(`sizes.${sizeTokens[name]}`) ?? '0'))
    return Object.fromEntries(sizeNames.map((name) => [name, get(name)])) as Record<
      SizeName,
      number | '100%'
    >
  }, [system])
}

function parseSize(value: string): number | '100%' {
  if (value === '100%') return value
  const numeric = Number.parseFloat(value)
  if (Number.isNaN(numeric)) return 0
  if (value.endsWith('rem') || value.endsWith('em')) return numeric * 16
  return numeric
}
