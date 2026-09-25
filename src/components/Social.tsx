// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-brand/src/components/Social.tsx
'use client'

import { HStack, Icon, type IconProps, type StackProps } from '@chakra-ui/react'
import type { ComponentType } from 'react'

import { useFramework } from '../framework'
import { Link, type LinkProps } from './Link'

/** One social link: where it goes, whether it leaves the site, its accessible name and its icon. */
export interface SocialLinkDescriptor {
  href: string
  isExternal: boolean
  label: string
  Icon: ComponentType
}

/** The row's links and the sizing of its icons: `iconBoxSize` fixes them, or they grow to fill the row up to `iconMaxWidth`. */
export interface SocialProps {
  socialLinks: Array<SocialLinkDescriptor>
  width?: StackProps['width']
  iconBoxSize?: IconProps['boxSize']
  iconMaxWidth?: IconProps['maxWidth']
}

/** A row of social icon links, each icon carrying the link's name. Route links go through the framework's link component. */
export function Social(props: SocialProps) {
  const { socialLinks, width, iconBoxSize, iconMaxWidth } = props

  return (
    <HStack
      as="section"
      gap="4"
      width={width}
      justifyContent="flex-end"
      alignItems="baseline"
      aria-label="Village Kit on social media"
    >
      {socialLinks.map((socialLink) => (
        <SocialLink
          key={socialLink.href}
          {...socialLink}
          iconBoxSize={iconBoxSize}
          iconMaxWidth={iconMaxWidth}
        />
      ))}
    </HStack>
  )
}

interface SocialLinkProps extends SocialLinkDescriptor {
  iconBoxSize?: IconProps['boxSize']
  iconMaxWidth?: IconProps['maxWidth']
}

function SocialLink(props: SocialLinkProps) {
  const { label, href, Icon: SocialIcon, isExternal, iconBoxSize = 'auto', iconMaxWidth } = props

  const { linkComponent } = useFramework()

  const flexGrow = iconBoxSize === 'auto' ? 1 : undefined
  // Chakra's Icon writes aria-hidden="true" before spreading its props; undefined removes the
  // attribute so the icon carries the link's name.
  const icon = (
    <Icon
      as={SocialIcon}
      aria-label={label}
      aria-hidden={undefined}
      boxSize={iconBoxSize}
      flexGrow={flexGrow}
      maxWidth={iconMaxWidth}
    />
  )
  const linkProps: LinkProps = {
    variant: 'tertiary',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexGrow,
  }

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer" {...linkProps}>
        {icon}
      </Link>
    )
  }

  return (
    <Link as={linkComponent} href={href} {...linkProps}>
      {icon}
    </Link>
  )
}
