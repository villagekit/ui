'use client'

// Adapted from https://github.com/sallto/use-active-heading

import { useEffect, useRef, useState } from 'react'

/**
 * Tracks which heading anchor (e.g. `#installation`) is currently active in
 * the viewport, given a list of heading hrefs. Returns the active href
 * (including `#`) or `null` before any heading is observed.
 */
export function useActiveHeading(headingList: Array<string>): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  const headingElementsRef = useRef<{ [id: string]: IntersectionObserverEntry }>({})

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry
        return map
      }, headingElementsRef.current)

      const visible: Array<IntersectionObserverEntry> = []
      for (const id of Object.keys(headingElementsRef.current)) {
        const entry = headingElementsRef.current[id]
        if (entry?.isIntersecting) visible.push(entry)
      }

      if (visible.length === 0) {
        // User scrolled past all headings (or reloaded mid-scroll). Pick the
        // most recent heading above the viewport.
        const above = entries.reverse().find((e) => e.boundingClientRect.bottom < 100)
        if (above) setActiveId(`#${above.target.id}`)
      } else if (visible.length === 1) {
        const first = visible[0]
        if (first) setActiveId(`#${first.target.id}`)
      } else {
        const indexOf = (id: string) => headingList.findIndex((h) => h.substring(1) === id)
        const sorted = visible.sort((a, b) => indexOf(a.target.id) - indexOf(b.target.id))
        const first = sorted[0]
        if (first) setActiveId(`#${first.target.id}`)
      }
    }

    const observer = new IntersectionObserver(callback, { rootMargin: '0px 0px -40% 0px' })

    for (const heading of headingList) {
      // getElementById sidesteps CSS-selector escaping for ids starting with a digit
      // (e.g. "3d-printing-…") which would crash querySelector.
      const el = document.getElementById(heading.replace(/^#/, ''))
      if (el != null) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headingList])

  return activeId
}
