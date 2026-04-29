'use client'

import { Container, Wrap } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { Title } from './Title'

export interface CardsLayoutProps {
  title: string
  children?: ReactNode | Array<ReactNode>
}

/**
 * A page layout for browsing a grid of cards with a centered page title.
 * SEO is intentionally NOT handled here — consumers use Next.js metadata.
 */
export function CardsLayout(props: CardsLayoutProps) {
  const { title, children } = props

  return (
    <>
      <Title>{title}</Title>

      <Container maxW="2xl">
        <Wrap gap="8" justify="center" overflow="visible">
          {children}
        </Wrap>
      </Container>
    </>
  )
}
