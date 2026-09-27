'use client'

import { Tooltip as BaseTooltip, Portal, type SystemStyleObject } from '@chakra-ui/react'
import type { ReactNode, RefObject } from 'react'

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

  // The 0.9.0 wrapper's `arrowPadding={8}`, the arrow's distance from the tooltip's corners;
  // zag's default is 4.
  return (
    <BaseTooltip.Root open={open} positioning={{ placement, arrowPadding: 8 }}>
      <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
      <Portal container={portalProps?.containerRef}>
        <BaseTooltip.Positioner>
          <BaseTooltip.Content css={[contentStyles, css]}>
            {/* Chakra v2's `arrowSize` default, 10px; Chakra v3's recipe has `sizes.2`. */}
            {showArrow ? (
              <BaseTooltip.Arrow css={{ '--arrow-size': '10px' }}>
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
}
