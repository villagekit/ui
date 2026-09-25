// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/blockquote.tsx
'use client'

import type { ReactNode } from 'react'
import { FaQuoteRight } from 'react-icons/fa'

import { BlockSection } from '../components/layouts/BlockSection'

/** The blockquote's content, the paragraphs Markdown put inside it. */
export interface MdxBlockquoteProps {
  children?: ReactNode | Array<ReactNode>
}

/** A Markdown blockquote as a `BlockSection` stack with a quote icon, exposed as its paragraphs, not a `blockquote`. */
export function MdxBlockquote(props: MdxBlockquoteProps) {
  const { children } = props

  return <BlockSection Icon={FaQuoteRight}>{children}</BlockSection>
}
