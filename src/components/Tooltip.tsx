'use client'

import { Tooltip as BaseTooltip, Portal } from '@chakra-ui/react'
import type { ReactNode } from 'react'

export interface TooltipProps {
  label: ReactNode
  open?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right'
  children: ReactNode
  showArrow?: boolean
}

export function Tooltip(props: TooltipProps) {
  const { label, open, placement = 'top', showArrow = true, children } = props

  return (
    <BaseTooltip.Root open={open} positioning={{ placement }}>
      <BaseTooltip.Trigger asChild>{children}</BaseTooltip.Trigger>
      <Portal>
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
