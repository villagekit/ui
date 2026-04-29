'use client'

import { Container, VStack, useBreakpointValue } from '@chakra-ui/react'

import { AnchorHeading, type AnchorHeadingProps } from './AnchorHeading'
import { Description } from './Description'

export interface TitleProps extends AnchorHeadingProps {
  description?: string
}

export function Title(props: TitleProps) {
  const { as = 'h1', description, ...rest } = props

  const paddingTop = useBreakpointValue({ base: 2, md: 8 })

  return (
    <VStack my="8" gap="12">
      <Container maxW="2xl">
        <AnchorHeading as={as} pt={paddingTop} textAlign="center" {...rest} />
      </Container>

      {description != null && <Description>{description}</Description>}
    </VStack>
  )
}
