'use client'

import { Slider as BaseSlider, type SliderRootProps, mergeRefs } from '@chakra-ui/react'
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'

export type {
  SliderRootProps as SliderProps,
  SliderTrackProps,
  SliderThumbProps,
} from '@chakra-ui/react'

const isClient = typeof window !== 'undefined'
const useSafeLayoutEffect = isClient ? useLayoutEffect : useEffect

/**
 * Chakra v3's slider root with Chakra v2's thumb placement and root size: each thumb is
 * centered on its value, so at the ends it overhangs the track by half its width (zag's
 * `thumbAlignment` is `center`, where zag's default `contain` keeps it inside), and the root
 * is as tall (or, vertical, as wide) as its largest thumb, measured after mount the way
 * Chakra v2's slider measured it for its padding. The measure is written on the root as
 * `--slider-thumb-measured-width` and `--slider-thumb-measured-height`, which the recipe's
 * control reads before the size's `--slider-thumb-size`; zag measures thumbs only under
 * `contain`. The thumbs are found again when their count changes. A caller's
 * `thumbAlignment` still wins.
 */
const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(function SliderRoot(props, ref) {
  const rootRef = useRef<HTMLDivElement>(null)
  const thumbCount = props.value?.length ?? props.defaultValue?.length ?? 1

  // Run again when the thumb count changes, so a thumb added later is measured too.
  useSafeLayoutEffect(() => {
    const root = rootRef.current
    if (root == null) return
    // By role, as zag finds them: a trigger wrapping a thumb (a tooltip) rewrites its data parts.
    const thumbs = [...root.querySelectorAll<HTMLElement>('[role="slider"]')]
    if (thumbs.length === 0) return
    const measure = () => {
      const width = Math.max(...thumbs.map((thumb) => thumb.offsetWidth))
      const height = Math.max(...thumbs.map((thumb) => thumb.offsetHeight))
      // A thumb that is not rendered (a hidden slider) measures nothing; the size's var holds.
      if (width === 0 && height === 0) return
      root.style.setProperty('--slider-thumb-measured-width', `${width}px`)
      root.style.setProperty('--slider-thumb-measured-height', `${height}px`)
    }
    measure()
    const observer = new ResizeObserver(measure)
    for (const thumb of thumbs) observer.observe(thumb)
    return () => observer.disconnect()
  }, [thumbCount])

  return <BaseSlider.Root ref={mergeRefs(rootRef, ref)} thumbAlignment="center" {...props} />
})

export const Slider: Omit<typeof BaseSlider, 'Root'> & { Root: typeof SliderRoot } = {
  Context: BaseSlider.Context,
  Control: BaseSlider.Control,
  DraggingIndicator: BaseSlider.DraggingIndicator,
  HiddenInput: BaseSlider.HiddenInput,
  Label: BaseSlider.Label,
  Marker: BaseSlider.Marker,
  MarkerGroup: BaseSlider.MarkerGroup,
  MarkerIndicator: BaseSlider.MarkerIndicator,
  MarkerLabel: BaseSlider.MarkerLabel,
  Marks: BaseSlider.Marks,
  PropsProvider: BaseSlider.PropsProvider,
  Range: BaseSlider.Range,
  Root: SliderRoot,
  // Chakra v3's own, for a caller that drives the machine itself: neither centered nor measured.
  RootProvider: BaseSlider.RootProvider,
  Thumb: BaseSlider.Thumb,
  Thumbs: BaseSlider.Thumbs,
  Track: BaseSlider.Track,
  ValueText: BaseSlider.ValueText,
}
