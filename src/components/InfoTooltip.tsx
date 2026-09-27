'use client'

import { Box, Icon } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { useMobileFriendlyTooltip } from '../hooks/useMobileFriendlyTooltip'
import { Tooltip, type TooltipProps } from './Tooltip'

export interface InfoTooltipProps {
  label: ReactNode
  pointerTimeout?: number
  /** Passed through to the `Tooltip`: where it is portaled. */
  portalProps?: TooltipProps['portalProps']
  /** Passed through to the `Tooltip`: styles for its content. */
  css?: TooltipProps['css']
}

export function InfoTooltip(props: InfoTooltipProps) {
  const { label, pointerTimeout, portalProps, css } = props

  const { onPointerEnterTooltip, onPointerLeaveTooltip, showTooltip } =
    useMobileFriendlyTooltip(pointerTimeout)

  return (
    <Tooltip label={label} open={showTooltip} portalProps={portalProps} css={css}>
      <Box onPointerEnter={onPointerEnterTooltip} onPointerLeave={onPointerLeaveTooltip}>
        {/* Chakra's Icon writes aria-hidden="true" before spreading its props; undefined removes
            it, so the svg is the named image the 0.9.0 icon was (Chakra v2's Icon wrote no
            aria-hidden) and the tooltip's trigger stays in the accessibility tree. */}
        <Icon
          aria-hidden={undefined}
          aria-label="Tooltip"
          color="gray.300"
          marginBottom="1"
          transitionDuration="slow"
          _hover={{ color: 'primary.300' }}
        >
          <FaInfoCircle />
        </Icon>
      </Box>
    </Tooltip>
  )
}
