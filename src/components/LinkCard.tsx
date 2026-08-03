'use client'

import {
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  type LinkOverlayProps,
  Stack,
  Text,
  chakra,
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
  /** Render the overlay anchor as another component — e.g. `linkComponent={NextLink}` for client-side routing. */
  linkComponent?: LinkOverlayProps['as']
}

export function LinkCard(props: LinkCardProps) {
  const { as, title, icon, description, href, isExternal, linkComponent } = props

  return (
    <LinkBox h="full">
      <HoverCard as={as} h="full" paddingX="6" paddingY="8">
        <Stack direction="column" alignItems="center" justifyContent="flex-start" gap="4" h="100%">
          {icon != null && (
            <Icon w="8" h="8" color="primary.600">
              {icon}
            </Icon>
          )}

          <Heading as="h3" size="md" textAlign="center">
            {title}
          </Heading>

          <Text textAlign="center">{description}</Text>

          {/* asChild, because LinkOverlay itself destructures `rel` away and never applies it. */}
          <LinkOverlay asChild>
            {/* biome-ignore lint/a11y/useAnchorContent: pre-existing — the overlay anchor is
                empty and the link goes unnamed. Tracked in gridbeam.xyz todo/07-code-review/18. */}
            <chakra.a
              as={linkComponent}
              href={href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            />
          </LinkOverlay>
        </Stack>
      </HoverCard>
    </LinkBox>
  )
}
