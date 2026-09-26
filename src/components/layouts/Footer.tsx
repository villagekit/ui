// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-brand/src/components/Footer.tsx
// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-page/src/components/Footer.tsx
'use client'

import { Box, Container, Icon, Stack, VStack, useBreakpointValue } from '@chakra-ui/react'
import type { ReactNode } from 'react'
import { FaHeart } from 'react-icons/fa'

import { useFramework } from '../../framework'
import { Heading } from '../Heading'
import { Link } from '../Link'
import { Social, type SocialLinkDescriptor } from '../Social'
import { Text } from '../Text'

/** One link in a footer column; an external one opens in a new tab. */
export interface FooterLink {
  href: string
  label: string
  isExternal?: boolean
}

/** One footer column: its heading and its links. */
export interface FooterSection {
  heading: string
  links: Array<FooterLink>
}

/** The footer's four columns, one per section. */
export type FooterSections = [FooterSection, FooterSection, FooterSection, FooterSection]

/**
 * The site footer's props: the link columns, the social row (`null` for none), whether the
 * credit links to villagekit.com, and children rendered between the social row and the credit.
 */
export interface FooterProps {
  sections: FooterSections
  socialLinks: Array<SocialLinkDescriptor> | null
  shouldLinkToCompanyWebsite?: boolean
  children?: ReactNode | Array<ReactNode>
}

/** The site footer: the link columns, then the social row, the children and the Village Kit credit. */
export function Footer(props: FooterProps) {
  const { socialLinks, shouldLinkToCompanyWebsite = true, children, ...baseFooterProps } = props

  return (
    <BaseFooter {...baseFooterProps}>
      {socialLinks != null && (
        <Container>
          <Social socialLinks={socialLinks} width="full" iconMaxWidth={8} />
        </Container>
      )}

      {children}

      <FooterSlogan shouldLinkToCompanyWebsite={shouldLinkToCompanyWebsite} />
    </BaseFooter>
  )
}

interface BaseFooterProps {
  sections: FooterSections
  children: ReactNode | Array<ReactNode>
}

function BaseFooter(props: BaseFooterProps) {
  const { sections, children } = props

  const paddingTop = useBreakpointValue({ base: 8, md: 12 })

  return (
    <Box
      as="footer"
      backgroundColor="accentB.50"
      borderColor="accentB.200"
      borderStyle="dashed"
      borderTopWidth={2}
      zIndex={10}
    >
      <VStack gap="8" pb="4" pt={paddingTop}>
        <Stack direction={{ base: 'column', md: 'row' }} gap={{ base: '8', md: '0' }}>
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
    // Four columns at 3xs are 896px, wider than the md viewport, so between md and lg the
    // minimum is 44 (11rem) and the four fit a 768px row.
    <VStack as="section" flex="0" minW={{ base: '3xs', md: '44', lg: '3xs' }}>
      <Heading size="md" mb="2">
        {heading}
      </Heading>

      {children}
    </VStack>
  )
}

function FooterLinkItem(props: FooterLink) {
  const { href, label, isExternal = false } = props

  const { linkComponent } = useFramework()

  if (isExternal) {
    return (
      <Link href={href} variant="tertiary" isExternal>
        {label}
      </Link>
    )
  }
  return (
    <Link as={linkComponent} href={href} variant="tertiary">
      {label}
    </Link>
  )
}

interface FooterSloganProps {
  shouldLinkToCompanyWebsite: boolean
}

function FooterSlogan(props: FooterSloganProps) {
  const { shouldLinkToCompanyWebsite } = props

  const authorName = 'Village Kit'
  const author = shouldLinkToCompanyWebsite ? (
    <Link href="https://villagekit.com" isExternal>
      {authorName}
    </Link>
  ) : (
    authorName
  )

  return (
    <VStack as="section" aria-label="Site credit">
      <Text variant="tertiary" fontSize="sm">
        Created with{' '}
        {/* Chakra v3's icon recipe adds verticalAlign middle; baseline keeps the heart on the
            line, and undefined removes the aria-hidden the Icon writes so the title is exposed. */}
        <Icon aria-hidden={undefined} color="primary.400" verticalAlign="baseline">
          <FaHeart title="love" />
        </Icon>{' '}
        by {author}
      </Text>

      <Text variant="tertiary" fontSize="xs">
        © {new Date().getFullYear()}
      </Text>
    </VStack>
  )
}
