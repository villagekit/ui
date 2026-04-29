'use client'

import { Stack, type StackProps } from '@chakra-ui/react'
import { type ReactNode, createContext, forwardRef, useContext } from 'react'

const ColumnIndexContext = createContext<number>(-1)

export const useColumnIndex = () => useContext(ColumnIndexContext)

export function useIsInColumn() {
  return useColumnIndex() !== -1
}

export interface ColumnProps extends StackProps {
  index: number
  children: ReactNode | Array<ReactNode>
}

export const Column = forwardRef<HTMLDivElement, ColumnProps>(function Column(props, ref) {
  const { index, ...rest } = props

  return (
    <ColumnIndexContext.Provider value={index}>
      <Stack ref={ref} direction="column" className="vk-column" data-index={index} {...rest} />
    </ColumnIndexContext.Provider>
  )
})
