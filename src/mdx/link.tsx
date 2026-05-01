'use client'

import { Link, type LinkProps } from '../components/Link'

export function MdxLink(props: LinkProps) {
  const { href } = props

  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href) && !href.startsWith('#')

  if (isExternal) {
    return <Link variant="paragraph" target="_blank" rel="noopener noreferrer" {...props} />
  }

  return <Link variant="paragraph" {...props} />
}
