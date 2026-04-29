'use client'

import { Box, type BoxProps, mergeRefs } from '@chakra-ui/react'
import { forwardRef } from 'react'

import { useAssertChildIndexes } from './hooks/useAssertChildIndexes'

export interface MainProps extends BoxProps {}

export const Main = forwardRef<HTMLDivElement, MainProps>(function Main(props, ref) {
  const assertChildIndexesRef = useAssertChildIndexes<HTMLDivElement>({
    childClassName: 'vk-section',
  })

  return (
    <Box ref={mergeRefs(ref, assertChildIndexesRef)} as="main" className="vk-main" {...props} />
  )
})
