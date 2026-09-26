'use client'

import { Container, useBreakpointValue } from '@chakra-ui/react'

import { Text, type TextProps } from '../Text'

export interface DescriptionProps {
  /** The element the sentence renders as, a `p` unless set. */
  textAs?: TextProps['as']
  /** The sentence. */
  children: string
}

/**
 * A centered sentence under a page title, font size `md` and `lg` from the `md` breakpoint, bounded to the width of the `lg` breakpoint (1024px, the legacy `container.lg`; `breakpoint-lg` is the size token Chakra v3 generates from the breakpoint).
 */
export function Description(props: DescriptionProps) {
  const { textAs, children } = props

  const fontSize = useBreakpointValue({ base: 'md', md: 'lg' }, { fallback: 'md' })

  return (
    <Container maxW="breakpoint-lg">
      <Text as={textAs} fontSize={fontSize} textAlign="center">
        {children}
      </Text>
    </Container>
  )
}
