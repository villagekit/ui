'use client'

import {
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  type LinkOverlayProps,
  Stack,
  Text,
} from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { HoverCard, type HoverCardProps } from './HoverCard'

export interface LinkCardProps {
  as?: HoverCardProps['as']
  title: string
  icon?: ReactNode
  description: string
  href: LinkOverlayProps['href']
  isExternal?: boolean
}

export function LinkCard(props: LinkCardProps) {
  const { as, title, icon, description, href, isExternal } = props

  return (
    <LinkBox h="full">
      <HoverCard as={as} h="full" paddingX="6" paddingY="8">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="flex-start"
          gap="4"
          h="100%"
        >
          {icon != null && (
            <Icon w="8" h="8" color="primary.600">
              {icon}
            </Icon>
          )}

          <Heading as="h3" size="md" textAlign="center">
            {title}
          </Heading>

          <Text textAlign="center">{description}</Text>

          <LinkOverlay
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
          />
        </Stack>
      </HoverCard>
    </LinkBox>
  )
}
