import type { Meta, StoryObj } from '@storybook/react'

import { Box, Flex, HStack, Heading, Stack, StackSeparator, Text, VStack } from '../src'

const meta: Meta = {
  title: 'ui/Theme/Colors',
}

export default meta

type Story = StoryObj

const palettes: Array<{ name: string; tokens: string[] }> = [
  {
    name: 'primary',
    tokens: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'accentA',
    tokens: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'accentB',
    tokens: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    name: 'gray',
    tokens: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
]

export const Colors: Story = {
  render() {
    return (
      <VStack separator={<StackSeparator borderColor="gray.200" />} alignItems="stretch">
        {palettes.map(({ name, tokens }) => (
          <Flex
            key={name}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            padding="4"
          >
            <Heading size="md" marginRight="4">
              {name}
            </Heading>

            <Box>
              <HStack gap="0">
                {tokens.map((shade) => (
                  <Box key={shade} w="12" h="8">
                    <Text textAlign="center">{shade}</Text>
                  </Box>
                ))}
              </HStack>

              <Stack direction="row" gap="0" borderRadius="lg" boxShadow="md" overflow="hidden">
                {tokens.map((shade) => (
                  <Box key={shade} boxSize="12" backgroundColor={`${name}.${shade}`} />
                ))}
              </Stack>
            </Box>
          </Flex>
        ))}
      </VStack>
    )
  },
}
