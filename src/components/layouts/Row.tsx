'use client'

import { Stack, type StackProps, mergeRefs } from '@chakra-ui/react'
import { type ReactNode, createContext, forwardRef, useContext } from 'react'

import { useAssertChildIndexes } from './hooks/useAssertChildIndexes'

const RowIndexContext = createContext<number | null>(null)

export const useRowIndex = () => useContext(RowIndexContext)

export interface RowProps extends StackProps {
  index: number
  children: ReactNode | Array<ReactNode>
}

export const Row = forwardRef<HTMLDivElement, RowProps>(function Row(props, ref) {
  const { index, ...rest } = props

  const assertChildIndexesRef = useAssertChildIndexes<HTMLDivElement>({
    childClassName: 'vk-column',
  })

  return (
    <RowIndexContext.Provider value={index}>
      <Stack
        ref={mergeRefs(ref, assertChildIndexesRef)}
        className="vk-row"
        data-index={index}
        direction="row"
        {...rest}
      />
    </RowIndexContext.Provider>
  )
})
