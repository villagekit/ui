'use client'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { NavSide } from '../nav/NavSide'
import { useTopNavHeight } from '../nav/hooks'
import { Main, type MainProps } from './Main'
import { TableOfContents } from './TableOfContents'

export interface ContentLayoutProps {
  children: ReactNode
  mainProps?: MainProps
}

export function ContentMainLayout(props: ContentLayoutProps) {
  const { children, mainProps = {} } = props

  return (
    <ContentContainer>
      <ContentMain {...mainProps}>{children}</ContentMain>
    </ContentContainer>
  )
}

export function ContentSidenavMainTocLayout(props: ContentLayoutProps) {
  const { children, mainProps = {} } = props

  return (
    <ContentContainer>
      <ContentSidenav />
      <ContentToc />
      <ContentMain {...mainProps}>{children}</ContentMain>
    </ContentContainer>
  )
}

export function ContentSidenavMainLayout(props: ContentLayoutProps) {
  const { children, mainProps = {} } = props

  return (
    <ContentContainer>
      <ContentSidenav />
      <ContentMain {...mainProps}>{children}</ContentMain>
    </ContentContainer>
  )
}

export function ContentMainTocLayout(props: ContentLayoutProps) {
  const { children, mainProps = {} } = props

  return (
    <ContentContainer>
      <ContentToc />
      <ContentMain {...mainProps}>{children}</ContentMain>
    </ContentContainer>
  )
}

function ContentContainer({ children }: { children: ReactNode }) {
  const marginBottom = useBreakpointValue({ base: 8, md: 16 })

  return (
    <Flex
      direction="row"
      flex="1"
      justifyContent="center"
      mb={marginBottom}
      position="relative"
      width="full"
    >
      {children}
    </Flex>
  )
}

function ContentSidenav() {
  const topNavHeight = useTopNavHeight()

  return (
    <NavSide
      outerContainerProps={{
        display: { base: 'none', md: 'block' },
        px: 4,
        width: 64,
      }}
      innerContainerProps={{
        position: 'sticky',
        top: `calc(${topNavHeight} + 2rem)`,
      }}
    />
  )
}

function ContentToc() {
  const topNavHeight = useTopNavHeight()

  return (
    <TableOfContents
      outerContainerProps={{
        display: { base: 'none', xl: 'block' },
        order: 2,
        px: 4,
        width: 64,
      }}
      innerContainerProps={{
        position: 'sticky',
        top: `calc(${topNavHeight} + 2rem)`,
      }}
    />
  )
}

function ContentMain({ children, ...rest }: MainProps) {
  return (
    <Main flex="1" {...rest}>
      {children}
    </Main>
  )
}
