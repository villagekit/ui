export type NavItemDescriptor = {
  label: string
  href: string
  location: 'top' | 'side'
  children?: NavSubItemDescriptors
}

export type NavItemDescriptors = Array<NavItemDescriptor>
export type NavSubItemDescriptor = Omit<NavItemDescriptor, 'location'>
export type NavSubItemDescriptors = Array<NavSubItemDescriptor>

export interface NavBrandProps {
  onHideMobileMenu?: () => void
}

export interface NavActionProps {
  onHideMobileMenu?: () => void
}

export interface NavMobileActionProps {
  onHideMobileMenu?: () => void
}
