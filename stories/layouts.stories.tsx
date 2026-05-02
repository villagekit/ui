import type { Meta, StoryObj } from '@storybook/react'

import { Box, Heading, Section, Text, Title } from '../src'
import { Column } from '../src/components/layouts/Column'
import { Row } from '../src/components/layouts/Row'

const meta: Meta = {
  title: 'ui/Layouts',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj

export const SectionRowColumn: Story = {
  render() {
    return (
      <Section index={0}>
        <Title as="h2" description="A short description for the section.">
          Section title
        </Title>
        <Row index={0}>
          <Column index={0} flex="1">
            <Heading as="h3" size="md">
              Left column
            </Heading>
            <Text>The Section/Row/Column primitives compose deterministic page sections.</Text>
          </Column>
          <Column index={1} flex="1">
            <Heading as="h3" size="md">
              Right column
            </Heading>
            <Text>Each child reports its index for tooling and analytics.</Text>
          </Column>
        </Row>
      </Section>
    )
  },
}

export const SectionPaletteVariants: Story = {
  render() {
    return (
      <Box>
        <Section index={0} colorPalette="primary" mode="yborder-bg">
          <Heading as="h2">primary · yborder-bg</Heading>
        </Section>
        <Section index={1} colorPalette="accentA" mode="yborder">
          <Heading as="h2">accentA · yborder</Heading>
        </Section>
        <Section index={2} colorPalette="accentB" mode="roundborder">
          <Heading as="h2">accentB · roundborder</Heading>
        </Section>
      </Box>
    )
  },
}
