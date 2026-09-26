'use client'

import { Container, VStack, useBreakpointValue } from '@chakra-ui/react'

import { AnchorHeading, type AnchorHeadingProps } from './AnchorHeading'
import { Description } from './Description'

export interface TitleProps extends AnchorHeadingProps {
  /** A sentence rendered as a `Description` under the heading. */
  description?: string
}

/**
 * A centered page title, an `h1` unless `as` says otherwise, with an optional `description` under it. The heading is bounded to the width of the `md` breakpoint (768px, the legacy `container.md`; `breakpoint-md` is the size token Chakra v3 generates from the breakpoint), the description to `3xl`.
 */
export function Title(props: TitleProps) {
  const { as = 'h1', description, ...rest } = props

  const paddingTop = useBreakpointValue({ base: 2, md: 8 })

  return (
    <VStack my="8" gap="12">
      <Container maxW="breakpoint-md">
        <AnchorHeading as={as} pt={paddingTop} textAlign="center" {...rest} />
      </Container>

      {description != null && <Description>{description}</Description>}
    </VStack>
  )
}
