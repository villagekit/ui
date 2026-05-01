'use client'

import { Box, HStack, Icon } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { FaQuoteRight } from 'react-icons/fa'

export interface MdxBlockquoteProps {
  children?: ReactNode
}

export function MdxBlockquote(props: MdxBlockquoteProps) {
  const { children } = props

  return (
    <Box
      as="blockquote"
      width="100%"
      borderRadius="xl"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor="accentB.300"
      bg="accentB.50"
      px="5"
      py="3"
    >
      <HStack gap="3" alignItems="flex-start">
        <Icon boxSize="4" color="primary.400" mt="2" role="presentation">
          <FaQuoteRight />
        </Icon>
        <Box flex="1" color="gray.700">
          {children}
        </Box>
      </HStack>
    </Box>
  )
}
