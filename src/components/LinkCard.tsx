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
import type { ComponentType } from 'react'

import { useFramework } from '../framework'
import { HoverCard, type HoverCardProps } from './HoverCard'

/** The props of {@link LinkCard}: the card's title, icon and description, and where it links. */
export interface LinkCardProps {
  /** The card element; the default is a `div`. */
  as?: HoverCardProps['as']
  /** The card's heading, and the wrapper's `aria-label`. */
  title: string
  /** The icon component, e.g. `icon={FaCut}`; it renders at `8` by `8` in the card's text color. */
  icon: ComponentType
  /** The sentence or two under the heading. */
  description: string
  /** Where the card links. */
  href: LinkOverlayProps['href']
  /** Open the link in a new tab. */
  isExternal?: boolean
  /** Render the overlay anchor as another component, e.g. `linkComponent={NextLink}`; the default is the framework's link component for an internal href. */
  linkComponent?: LinkOverlayProps['as']
}

/**
 * A fixed-size card (`3xs` wide, `64` tall) that is one link: an icon, a heading and a description spread down the card, with the whole card clickable through a link overlay.
 */
export function LinkCard(props: LinkCardProps) {
  const { as, title, icon: IconComponent, description, href, isExternal, linkComponent } = props

  const framework = useFramework()
  const overlayComponent = linkComponent ?? (isExternal ? undefined : framework.linkComponent)

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
          {/* Exposed to assistive technology, as the legacy card's icon was. */}
          <Icon as={IconComponent} w="8" h="8" aria-hidden={undefined} />

          <Heading size="md" textAlign="center">
            {title}
          </Heading>

          <Text textAlign="center">{description}</Text>

          {/* asChild, because LinkOverlay itself destructures `rel` away and never applies it. */}
          <LinkOverlay asChild>
            {/* biome-ignore lint/a11y/useAnchorContent: kept for parity: the overlay anchor is empty and unnamed, as the legacy card's was (the wrapper's aria-label sits on a div and names nothing). Naming the anchor is an accessibility pass after the port. */}
            <chakra.a
              as={overlayComponent}
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
