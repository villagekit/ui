'use client'

import { Box, type BoxProps } from '@chakra-ui/react'

import { NavList } from './NavList'
import { useNavContext } from './context'

export interface NavSideProps {
  outerContainerProps?: BoxProps
  innerContainerProps?: BoxProps
}

export function NavSide(props: NavSideProps) {
  const { outerContainerProps, innerContainerProps } = props

  const { sideItems } = useNavContext()

  return (
    <Box as="aside" {...outerContainerProps}>
      <Box {...innerContainerProps}>
        <NavList
          items={sideItems}
          linkSize="md"
          containerProps={{
            'aria-label': 'Navigation',
            'aria-orientation': 'vertical',
            role: 'toolbar',
          }}
          gap="3"
          listProps={{ flex: '1' }}
        />
      </Box>
    </Box>
  )
}
