// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/MediaContainer.tsx
'use client'

import { Center, useBreakpointValue, useConst } from '@chakra-ui/react'
import type { ReactNode } from 'react'

/** The image or video the container bounds. */
export interface MediaContainerProps {
  children: ReactNode
}

/** Centers a story's image or video and bounds it to `md`, `lg` from the `md` breakpoint. */
export function MediaContainer(props: MediaContainerProps) {
  const { children } = props

  const maxWBreakpoints = useMediaMaxWidthBreakpoints()
  const maxW = useBreakpointValue(maxWBreakpoints)

  return (
    <Center maxW={maxW} alignSelf="center">
      {children}
    </Center>
  )
}

/** The container's bounds by breakpoint, the default `sizes` of the mdx `Image` and `Video`. */
export function useMediaMaxWidthBreakpoints() {
  return useConst({
    base: 'md',
    md: 'lg',
  } as const)
}
