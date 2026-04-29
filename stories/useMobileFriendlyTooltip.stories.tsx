import type { Meta, StoryObj } from '@storybook/react'
import { FaIceCream } from 'react-icons/fa'

import { Box, Icon, Tooltip } from '../src'
import { useMobileFriendlyTooltip } from '../src/hooks/useMobileFriendlyTooltip'

export default {
  title: 'ui/Helpers/UseMobileFriendlyTooltip',
} satisfies Meta

type Story = StoryObj

export const UseMobileFriendlyTooltip: Story = {
  render() {
    const { onPointerEnterTooltip, onPointerLeaveTooltip, showTooltip } = useMobileFriendlyTooltip()

    return (
      <Tooltip label="Mobile friendly tooltip!" open={showTooltip}>
        <Box
          onPointerEnter={onPointerEnterTooltip}
          onPointerLeave={onPointerLeaveTooltip}
          width="max-content"
        >
          <Icon color="primary.300">
            <FaIceCream />
          </Icon>
        </Box>
      </Tooltip>
    )
  },
}
