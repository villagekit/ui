'use client'

import { Container, useBreakpointValue } from '@chakra-ui/react'

import { Text, type TextProps } from '../Text'

export interface DescriptionProps {
  textAs?: TextProps['as']
  children: string
}

export function Description(props: DescriptionProps) {
  const { textAs, children } = props

  const fontSize = useBreakpointValue({ base: 'md', md: 'lg' }, { fallback: 'md' })

  return (
    <Container maxW="3xl">
      <Text as={textAs} fontSize={fontSize} textAlign="center">
        {children}
      </Text>
    </Container>
  )
}
