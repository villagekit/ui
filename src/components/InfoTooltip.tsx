'use client'

import { Box, Icon } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { FaInfoCircle } from 'react-icons/fa'
import { useMobileFriendlyTooltip } from '../hooks/useMobileFriendlyTooltip'
import { Tooltip } from './Tooltip'

export interface InfoTooltipProps {
  label: ReactNode
  pointerTimeout?: number
}

export function InfoTooltip(props: InfoTooltipProps) {
  const { label, pointerTimeout } = props

  const { onPointerEnterTooltip, onPointerLeaveTooltip, showTooltip } =
    useMobileFriendlyTooltip(pointerTimeout)

  return (
    <Tooltip label={label} open={showTooltip}>
      <Box onPointerEnter={onPointerEnterTooltip} onPointerLeave={onPointerLeaveTooltip}>
        <Icon
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
