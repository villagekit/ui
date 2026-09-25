// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/link.tsx
'use client'

import { Link, type LinkProps } from '../components/Link'

/** A Markdown link: a `#hash` scrolls the page, every other href opens in a new tab. */
export function MdxLink(props: LinkProps) {
  const { href } = props

  const shouldScroll = href?.startsWith('#')

  if (shouldScroll) {
    return <Link variant="paragraph" {...props} href={href} />
  }

  return <Link variant="paragraph" isExternal {...props} />
}
