'use client'

import NextLink from 'next/link'

import { Link, type LinkProps } from '../components/Link'

export function MdxLink(props: LinkProps) {
  const { href } = props

  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href) && !href.startsWith('#')

  if (isExternal) {
    return <Link variant="paragraph" target="_blank" rel="noopener noreferrer" {...props} />
  }

  // Same-page anchors stay plain — a `#hash` jump is not a route change.
  const isRoute = typeof href === 'string' && href.length > 0 && !href.startsWith('#')

  return <Link as={isRoute ? NextLink : undefined} variant="paragraph" {...props} />
}
