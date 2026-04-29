'use client'

import { useCallback, useEffect, useState } from 'react'

import { useWasRenderedOnClientAtLeastOnce } from '../../hooks/useWasRenderedOnClientAtLeastOnce'

/**
 * Live measurement of the sticky top nav's height (the element with class
 * `top-nav`, set by `<NavHeader>`). Used to compute scroll offsets so
 * anchor-linked headings aren't hidden under the nav.
 */
export function useTopNavHeight(): string {
  const [topNavHeight, setTopNavHeight] = useState(0)
  const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce()

  const update = useCallback(() => {
    const el = document.querySelector('.top-nav')
    setTopNavHeight(el ? el.clientHeight : 0)
  }, [])

  useEffect(() => {
    // Wait one render so the breakpoint-dependent layout settles before measuring.
    if (wasRenderedOnClientAtLeastOnce) update()

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [wasRenderedOnClientAtLeastOnce, update])

  return `${topNavHeight}px`
}
