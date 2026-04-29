'use client'

import { Box, Stack, VStack, useBreakpointValue } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { ReactNode } from 'react'

import { Heading } from '../Heading'
import { Link } from '../Link'

export interface FooterLink {
  href: string
  label: string
  isExternal?: boolean
}

export interface FooterSection {
  heading: string
  links: Array<FooterLink>
}

export type FooterSections = Array<FooterSection>

export interface FooterProps {
  sections: FooterSections
  children?: ReactNode | Array<ReactNode>
}

export function Footer(props: FooterProps) {
  const { sections, children } = props

  const paddingTop = useBreakpointValue({ base: 8, md: 12 })

  return (
    <Box
      as="footer"
      borderColor="accentB.200"
      borderStyle="dashed"
      borderTopWidth={2}
      backgroundColor="accentB.50"
      zIndex={10}
    >
      <VStack gap="8" pb="4" pt={paddingTop}>
        <Stack
          alignItems="flex-start"
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '8', md: '16' }}
        >
          {sections.map((section) => (
            <FooterColumn key={section.heading} heading={section.heading}>
              {section.links.map((link) => (
                <FooterLinkItem key={link.href} {...link} />
              ))}
            </FooterColumn>
          ))}
        </Stack>

        {children}
      </VStack>
    </Box>
  )
}

interface FooterColumnProps {
  heading: string
  children: ReactNode | Array<ReactNode>
}

function FooterColumn(props: FooterColumnProps) {
  const { heading, children } = props

  return (
    <VStack as="section" flex="0" minW="3xs" alignItems="flex-start">
      <Heading size="md" mb="2">
        {heading}
      </Heading>
      {children}
    </VStack>
  )
}

function FooterLinkItem(props: FooterLink) {
  const { href, label, isExternal = false } = props

  if (isExternal) {
    return (
      <Link href={href} variant="tertiary" target="_blank" rel="noopener noreferrer">
        {label}
      </Link>
    )
  }
  return (
    <Link as={NextLink} href={href} variant="tertiary">
      {label}
    </Link>
  )
}
