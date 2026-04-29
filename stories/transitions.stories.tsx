import type { Meta, StoryObj } from '@storybook/react'

import { Box, HStack, Text } from '../src'

const durations = ['fast', 'normal', 'slow', 'slower'] as const

export default {
  title: 'ui/Theme/Transitions',
} satisfies Meta

type Story = StoryObj

interface TransitionExampleProps {
  duration: string
}

function TransitionExample(props: TransitionExampleProps) {
  const { duration } = props

  return (
    <Box
      flex="1"
      padding="1"
      height="50px"
      backgroundColor="accentB.200"
      borderRadius="xl"
      boxShadow="md"
      transitionDuration={duration}
      _hover={{
        cursor: 'pointer',
        height: '150px',
      }}
    >
      <Text fontSize="sm" textAlign="center">
        {duration}
      </Text>
    </Box>
  )
}

export const Transitions: Story = {
  render() {
    return (
      <HStack alignItems="flex-start" padding="4">
        {durations.map((duration) => (
          <TransitionExample key={duration} duration={duration} />
        ))}
      </HStack>
    )
  },
}
