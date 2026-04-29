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
import type { ComponentType } from 'react'
import { HoverCard, type HoverCardProps } from './HoverCard'

export interface LinkCardProps {
  as?: HoverCardProps['as']
  title: string
  icon: ComponentType
  description: string
  href: LinkOverlayProps['href']
  isExternal?: boolean
  linkComponent?: LinkOverlayProps['as']
}

export function LinkCard(props: LinkCardProps) {
  const {
    as,
    title,
    icon: IconComponent,
    description,
    href,
    isExternal,
    linkComponent: LinkComponent,
  } = props

  return (
    <LinkBox>
      <HoverCard as={as} aria-label={title} height="64" paddingX="4" paddingY="8" width="3xs">
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-around"
          gap="4"
          height="100%"
        >
          <Icon w="8" h="8">
            <IconComponent />
          </Icon>

          <Heading size="md" textAlign="center">
            {title}
          </Heading>

          <Text textAlign="center">{description}</Text>

          <LinkOverlay as={LinkComponent} href={href} target={isExternal ? '_blank' : undefined} />
        </Stack>
      </HoverCard>
    </LinkBox>
  )
}
