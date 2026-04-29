'use client'

import { Flex } from '@chakra-ui/react'
import type { FunctionComponent, ReactNode } from 'react'

import { NavHeader, type NavHeaderProps } from '../nav/NavHeader'
import type { NavActionProps, NavBrandProps } from '../nav/types'

export interface MainLayoutProps {
  Footer: FunctionComponent
  Banner?: FunctionComponent
  HeaderBrand: FunctionComponent<NavBrandProps>
  HeaderAction: FunctionComponent<NavActionProps>
  headerColorPalette?: NavHeaderProps['colorPalette']
  children: ReactNode
}

export function MainLayout(props: MainLayoutProps) {
  const { Footer, Banner, HeaderBrand, HeaderAction, headerColorPalette, children } = props

  return (
    <Flex direction="column" alignItems="stretch" minH="100vh">
      <NavHeader Action={HeaderAction} Brand={HeaderBrand} colorPalette={headerColorPalette} />

      {Banner && <Banner />}

      {children}

      <Footer />
    </Flex>
  )
}
