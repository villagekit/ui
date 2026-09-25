import type { Meta, StoryObj } from '@storybook/react'
import { FaEnvelope, FaGithub, FaInstagram, FaMastodon, FaYoutube } from 'react-icons/fa'

import {
  Footer,
  type FooterProps,
  type FooterSections,
  type SocialLinkDescriptor,
  Text,
} from '../src'

const meta: Meta<FooterProps> = {
  component: Footer,
  title: 'ui/Footer',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

type Story = StoryObj<typeof Footer>

const sections: FooterSections = [
  {
    heading: 'Explore',
    links: [
      { href: '/designs', label: 'Designs' },
      { href: '/stories', label: 'Stories' },
      { href: '/tools-and-resources', label: 'Tools and resources' },
      { href: '/suppliers', label: 'Suppliers' },
    ],
  },
  {
    heading: 'About',
    links: [
      { href: '/about', label: 'About' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/subscribe', label: 'Newsletter' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { href: '/legal/privacy-policy', label: 'Privacy policy' },
      { href: '/legal', label: 'Site licence' },
    ],
  },
]

const socialLinks: Array<SocialLinkDescriptor> = [
  { Icon: FaEnvelope, href: '/subscribe', isExternal: false, label: 'Newsletter' },
  {
    Icon: FaMastodon,
    href: 'https://sunrise.social/@villagekit',
    isExternal: true,
    label: 'Mastodon',
  },
  {
    Icon: FaInstagram,
    href: 'https://instagram.com/village_kit',
    isExternal: true,
    label: 'Instagram',
  },
  {
    Icon: FaYoutube,
    href: 'https://www.youtube.com/@villagekit',
    isExternal: true,
    label: 'YouTube',
  },
  { Icon: FaGithub, href: 'https://github.com/villagekit', isExternal: true, label: 'GitHub' },
]

export const Basic: Story = {
  args: { sections, socialLinks },
}

export const WithoutSocial: Story = {
  args: { sections, socialLinks: null },
}

export const WithoutCompanyLink: Story = {
  args: { sections, socialLinks, shouldLinkToCompanyWebsite: false },
}

// Children render between the social row and the credit, where a site puts its logo.
export const WithChildren: Story = {
  render() {
    return (
      <Footer sections={sections} socialLinks={socialLinks}>
        <Text fontSize="sm" color="gray.700" textAlign="center">
          gridbeam.xyz, an open-source educational site about grid beam construction.
        </Text>
      </Footer>
    )
  },
}
