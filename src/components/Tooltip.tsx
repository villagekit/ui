'use client'

import { Tooltip as BaseTooltip, Portal } from '@chakra-ui/react'
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
}

export function Tooltip(props: TooltipProps) {
  const { label, open, placement = 'top', showArrow = true, portalProps, children } = props

  return (
    <BaseTooltip.Root open={open} positioning={{ placement }}>
      <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
      <Portal container={portalProps?.containerRef}>
        <BaseTooltip.Positioner>
          <BaseTooltip.Content
            color="white"
            borderRadius="md"
            fontSize="md"
            paddingX="2"
            paddingY="1"
            css={{ '--tooltip-bg': 'colors.primary.400' }}
          >
            {showArrow ? (
              <BaseTooltip.Arrow>
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
