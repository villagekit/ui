'use client'

import {
  Tooltip as BaseTooltip,
  Portal,
  type SystemStyleObject,
  defineKeyframes,
} from '@chakra-ui/react'
import type { CSSProperties, ReactNode, RefObject } from 'react'

export interface TooltipProps {
  label: ReactNode
  open?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
  showArrow?: boolean
  /**
   * Where the tooltip is portaled, Chakra v2's `portalProps` shape: `containerRef` names the
   * element it renders into, the document body when absent. A tooltip inside an element in
   * fullscreen mode must portal into that element, since the browser hides the rest of the
   * document behind it.
   */
  portalProps?: {
    containerRef?: RefObject<HTMLElement | null>
  }
  /**
   * Styles for the tooltip's content, merged over the wrapper's own, the way the 0.9.0 wrapper
   * merged a caller's `sx` over its defaults: a caller's key wins.
   */
  css?: SystemStyleObject
}

export function Tooltip(props: TooltipProps) {
  const { label, open, placement = 'top', showArrow = true, portalProps, css, children } = props

  // Chakra v2 set the tooltip 8px from its trigger with or without an arrow; zag adds half the
  // arrow element's height to its `gutter` when there is one, so 3 with the 10px arrow below. The
  // 0.9.0 wrapper's `arrowPadding={8}`, the arrow's distance from the tooltip's corners; zag's
  // default is 4.
  const gutter = showArrow ? 3 : 8
  return (
    <BaseTooltip.Root open={open} positioning={{ placement, gutter, arrowPadding: 8 }}>
      <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
      <Portal container={portalProps?.containerRef}>
        <BaseTooltip.Positioner>
          <BaseTooltip.Content css={[contentStyles, css]}>
            {/* Chakra v2's `arrowSize` default, 10px; Chakra v3's recipe has `sizes.2`. */}
            {showArrow ? (
              <BaseTooltip.Arrow css={{ '--arrow-size': '10px' }} style={arrowStyle}>
                <BaseTooltip.ArrowTip />
              </BaseTooltip.Arrow>
            ) : null}
            {label}
          </BaseTooltip.Content>
        </BaseTooltip.Positioner>
      </Portal>
    </BaseTooltip.Root>
  )
}

/**
 * Chakra v2's tooltip scale, 0.85 to 1 on open and back on close; Chakra v3's `scale-in` and
 * `scale-out` run from 0.95. Registered in the package's theme for the content's animation.
 */
export const tooltipKeyframes = defineKeyframes({
  'tooltip-scale-in': {
    from: { scale: '0.85' },
    to: { scale: '1' },
  },
  'tooltip-scale-out': {
    from: { scale: '1' },
    to: { scale: '0.85' },
  },
})

// The 0.9.0 wrapper's `sx` over Chakra v2's tooltip theme: `whiteAlpha.900` text on the
// document's line height (v2's theme set none, where Chakra v3's recipe writes the `xs` text
// style, a 1rem line), `md` type and radius, padded `2` by `1`. Chakra v3 applies style props
// after the `css` array, so these live in the array for a caller's `css` to win over them.
const contentStyles: SystemStyleObject = {
  '--tooltip-bg': 'colors.primary.400',
  color: 'whiteAlpha.900',
  lineHeight: 'inherit',
  borderRadius: 'md',
  fontSize: 'md',
  paddingX: '2',
  paddingY: '1',
  // Chakra v2 scaled the tooltip from the edge of its box that faces the trigger, where zag's
  // `--transform-origin` on the positioner names the arrow's tip, so the content sets the
  // variable for itself; the wrapper's `placement` is one of the four sides.
  '&[data-placement^=top]': { '--transform-origin': 'bottom center' },
  '&[data-placement^=bottom]': { '--transform-origin': 'top center' },
  '&[data-placement^=left]': { '--transform-origin': 'right center' },
  '&[data-placement^=right]': { '--transform-origin': 'left center' },
  // Chakra v2's framer-motion transition as framer-motion 7 ran it: the scale over 0.2s, on an
  // overshooting curve in and ease-in-out out, and the opacity over 0.2s in and 0.15s out, linear
  // (the transition named `easings`, a key framer-motion never read, so the opacity took the Web
  // Animations default and the exit scale the keyframe animator's). Chakra v3's recipe runs its
  // `scale-fade-in` and `scale-fade-out` over 150ms; its `animationStyle` expands to an
  // `animationName` before these keys merge over it. zag hides the content when its first
  // animation ends, the fade, where v2 waited for the scale too: the 50ms it cuts are at opacity 0.
  _open: {
    animationName: 'tooltip-scale-in, fade-in',
    animationDuration: '0.2s',
    animationTimingFunction: 'cubic-bezier(0.175, 0.885, 0.4, 1.1), linear',
  },
  _closed: {
    animationName: 'tooltip-scale-out, fade-out',
    animationDuration: '0.2s, 0.15s',
    animationTimingFunction: 'ease-in-out, linear',
  },
}

// Chakra v2 sat the arrow `size / 2 - 1px` outside the box, 4px of the 10px arrow, where zag
// sits it `size / 2` outside: zag places the arrow's near edge `--arrow-offset` inside the box's
// far edge, so one more pixel inside. zag writes the variable inline on the arrow, so the 1px is
// written inline too.
const arrowStyle: CSSProperties & Record<'--arrow-offset', string> = {
  '--arrow-offset': 'calc(var(--arrow-size-half) * -1 - 1px)',
}
