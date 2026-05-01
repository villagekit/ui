'use client'

import { useBreakpointValue } from '@chakra-ui/react'
import { useMemo } from 'react'

import {
  type BreakpointName,
  breakpointNames,
  useBreakpointWidths,
} from '../../hooks/useBreakpointWidth'
import { type SizeName, useSizeWidths } from '../../hooks/useSizeWidths'
import type { AspectRatio, Orientation } from './types'

export interface UseAspectRatioOptions {
  aspectRatioName?: AspectRatio
  orientation?: Orientation
}

export function useAspectRatio(options: UseAspectRatioOptions): string | undefined {
  const { aspectRatioName, orientation = 'landscape' } = options

  return useMemo(() => {
    if (aspectRatioName == null) return undefined

    let ratio: [number, number]
    if (aspectRatioName === 'wide') {
      ratio = [16, 9]
    } else if (aspectRatioName === 'standard') {
      ratio = [4, 3]
    } else {
      return undefined
    }

    if (orientation === 'portrait') {
      ratio.reverse()
    }

    return ratio.join('/')
  }, [aspectRatioName, orientation])
}

type SizeValueSimple = SizeName | string
type SizeValueSplit = [SizeValueSimple, number]
type SizeValue = SizeValueSimple | SizeValueSplit
export type Sizes = Partial<Record<BreakpointName, SizeValue>>

interface Width {
  value: number
  unit: 'px' | '%'
}
type Widths = Array<[BreakpointName, Width]>

export interface UseSizesOptions {
  sizes: Sizes
}

function useSizes(options: UseSizesOptions): Widths {
  const { sizes } = options

  const sizeWidths = useSizeWidths()

  return useMemo(() => {
    return breakpointNames
      .map((breakpointName): [BreakpointName, Width] | null => {
        let sizeName = sizes[breakpointName]
        let sizeSplit = 1
        if (sizeName == null) return null
        if (Array.isArray(sizeName)) {
          ;[sizeName, sizeSplit] = sizeName
        }

        const sizeValue = sizeName in sizeWidths ? sizeWidths[sizeName as SizeName] : sizeName

        let widthUnit: 'px' | '%'
        let widthValue: number
        if (typeof sizeValue === 'number') {
          widthValue = sizeValue
          widthUnit = 'px'
        } else if (sizeValue.endsWith('px')) {
          widthValue = Number(sizeValue.split('px')[0])
          widthUnit = 'px'
        } else if (sizeValue.endsWith('%')) {
          widthValue = Number(sizeValue.split('%')[0])
          widthUnit = '%'
        } else {
          throw new Error(`Unexpected size value: ${sizeValue}`)
        }

        widthValue = widthValue / sizeSplit

        return [breakpointName, { unit: widthUnit, value: widthValue }]
      })
      .filter((v): v is [BreakpointName, Width] => v != null)
  }, [sizes, sizeWidths])
}

export function useImageSizes(options: UseSizesOptions): string {
  const widths = useSizes(options)
  const breakpointWidths = useBreakpointWidths()

  return useMemo(() => {
    const breakpointImageSizes = widths.map(([breakpointName, width]): [string, string] => {
      const screenWidth = breakpointWidths[breakpointName]
      const widthValue = width.value
      const widthUnit = width.unit === '%' ? 'vw' : width.unit
      return [`${screenWidth}px`, `${widthValue.toFixed(2)}${widthUnit}`]
    })

    breakpointImageSizes.reverse()

    return breakpointImageSizes
      .map(([screenWidth, imageSizeWidth], index) => {
        if (index === breakpointImageSizes.length - 1) {
          return imageSizeWidth
        }
        return `(min-width: ${screenWidth}) ${imageSizeWidth}`
      })
      .join(', ')
  }, [widths, breakpointWidths])
}

export function useVideoSizes(options: UseSizesOptions): number | undefined {
  const widths = useSizes(options)
  const breakpointWidths = useBreakpointWidths()

  const videoWidths = useMemo(() => {
    const widthSizePairs = widths.map(([breakpointName, width]): [BreakpointName, number] => {
      const screenWidth = breakpointWidths[breakpointName]
      const widthValue = width.unit === '%' ? 0.01 * width.value * screenWidth : width.value
      return [breakpointName, widthValue]
    })
    return Object.fromEntries(widthSizePairs) as Partial<Record<BreakpointName, number>>
  }, [widths, breakpointWidths])

  return useBreakpointValue(videoWidths)
}
