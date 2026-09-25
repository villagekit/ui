'use client'

import { Link, type LinkProps } from '../components/Link'
import { useFramework } from '../framework'

export function MdxLink(props: LinkProps) {
  const { href } = props

  const { linkComponent } = useFramework()

  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href) && !href.startsWith('#')

  if (isExternal) {
    return <Link variant="paragraph" target="_blank" rel="noopener noreferrer" {...props} />
  }

  // Same-page anchors stay plain — a `#hash` jump is not a route change.
  const isRoute = typeof href === 'string' && href.length > 0 && !href.startsWith('#')

  return <Link as={isRoute ? linkComponent : undefined} variant="paragraph" {...props} />
}
