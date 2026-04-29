'use client'

import { HStack, type HTMLChakraProps, Icon } from '@chakra-ui/react'
import type { ComponentType, ReactNode } from 'react'

import { Text } from '../Text'

export interface BlockSectionProps {
  children: ReactNode | Array<ReactNode>
  Icon: ComponentType
  css?: HTMLChakraProps<'div'>['css']
}

export function BlockSection(props: BlockSectionProps) {
  const { children, Icon: BlockSectionIcon, css } = props

  return (
    <HStack
      gap="4"
      css={[
        {
          background: 'accentB.50',
          borderColor: 'accentB.300',
          borderRadius: 'xl',
          borderStyle: 'dashed',
          borderWidth: 2,
          boxShadow: 'sm',
          paddingX: 4,
          paddingY: 2,
        },
        css,
      ]}
    >
      <Icon boxSize="4" color="primary.400" role="presentation">
        <BlockSectionIcon />
      </Icon>

      {/* `as="div"` because Text defaults to <p>, which can't contain block children. */}
      <Text as="div" variant="secondary">
        {children}
      </Text>
    </HStack>
  )
}
