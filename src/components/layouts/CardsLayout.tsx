'use client'

import { Container, Wrap } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { Title } from './Title'

export interface CardsLayoutProps {
  title: string
  children?: ReactNode | Array<ReactNode>
}

/**
 * A page layout for browsing a wrap of cards under a centered page title, in a container the width of the `md` breakpoint (768px). The page title metadata is the app's, not this layout's.
 */
export function CardsLayout(props: CardsLayoutProps) {
  const { title, children } = props

  return (
    <>
      <Title>{title}</Title>

      <Container maxW="breakpoint-md">
        <Wrap gap="8" justify="center" overflow="visible">
          {children}
        </Wrap>
      </Container>
    </>
  )
}
