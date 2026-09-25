'use client'

import { type RefObject, useEffect, useRef } from 'react'

import { sortNodes } from '../util/sortNodes'

// The consumer's bundler substitutes `process.env.NODE_ENV`; declared here so the package needs
// no Node types.
declare const process: { env: { NODE_ENV?: string } }

interface UseAssertChildIndexesOptions {
  childClassName: string
}

/**
 * Dev-only sanity check: warns if a layout container's children don't have
 * sequential `data-index` values matching their DOM order.
 */
export function useAssertChildIndexes<Element extends HTMLElement = HTMLElement>(
  options: UseAssertChildIndexesOptions,
): RefObject<Element | null> {
  const { childClassName } = options

  const ref = useRef<Element>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') return

    const node = ref.current
    if (node == null) return

    const childNodes = Array.from(node.querySelectorAll(`.${childClassName}`))
    const sortedChildNodes = sortNodes(childNodes)

    sortedChildNodes.forEach((childNode, index) => {
      if ((childNode as Element).dataset['index'] !== String(index)) {
        console.warn('useAssertChildIndexes: bad child index', { expected: index, node: childNode })
      }
    })
  })

  return ref
}
