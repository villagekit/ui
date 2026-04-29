'use client'

import { chakra } from '@chakra-ui/react'
import type { ReactNode } from 'react'

import { Heading, type HeadingProps } from '../Heading'
import { useTopNavHeight } from '../nav/hooks'

export interface AnchorHeadingProps extends HeadingProps {
  children?: ReactNode | Array<ReactNode>
  hasAnchor?: boolean
}

/**
 * A `Heading` that, when `hasAnchor` is set, renders the text inside a `<a href="#id">`
 * for deep linking — and adjusts `scroll-margin-top` so the heading isn't hidden under
 * the sticky top nav after a hash-link click.
 */
export function AnchorHeading(props: AnchorHeadingProps) {
  const { children, hasAnchor = false, css, ...rest } = props
  let { id } = props

  const topNavHeight = useTopNavHeight()

  if (!hasAnchor) {
    return <Heading {...props} />
  }

  if (id == null) id = getHeadingId(children)

  return (
    <Heading id={id} css={[{ scrollMarginTop: topNavHeight }, css]} {...rest}>
      {id != null ? <chakra.a href={`#${id}`}>{children}</chakra.a> : children}
    </Heading>
  )
}

export function getHeadingId(text: ReactNode): string | undefined {
  if (typeof text !== 'string') return undefined
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/ /g, '-')
}
