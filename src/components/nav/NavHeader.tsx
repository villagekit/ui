// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-nav/src/components/NavHeader.tsx
'use client'

import { Box, Flex, Icon, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'
import { useCallback, useEffect, useId } from 'react'
import { FocusOn } from 'react-focus-on'
import { FaBars, FaTimes } from 'react-icons/fa'

import { useIsMobile } from '../../hooks/useIsMobile'
import { IconButton } from '../IconButton'
import { NavBar } from './NavBar'
import { NavMobileMenu } from './NavMobileMenu'
import { useNavContext } from './context'
import type { NavActionProps, NavBrandProps, NavMobileActionProps } from './types'

export interface NavHeaderProps {
  Brand: FC<NavBrandProps>
  Action: FC<NavActionProps>
  MobileAction?: FC<NavMobileActionProps>
  colorPalette?: 'primary' | 'accentA' | 'accentB'
}

/**
 * The sticky site header: the brand, the action, and the top nav items from `NavContextProvider`
 * from the `md` breakpoint; below it, a toggle that slides `NavMobileMenu` in under the header.
 * While the menu is open, focus is held inside the header, the page behind it is inert and
 * Escape closes it.
 */
export function NavHeader(props: NavHeaderProps) {
  const { Brand, Action, MobileAction, colorPalette = 'accentB' } = props

  const {
    open: isMobileMenuOpen,
    onClose: onHideMobileMenu,
    onToggle: onToggleMobileMenu,
  } = useDisclosure()

  // Chakra v3's `useDisclosure` mints no id, so the toggle's `aria-controls` and the panel's `id` share this.
  const mobileMenuId = useId()

  const isMobile = useIsMobile()
  const { topItems: topNavItems } = useNavContext()

  useEffect(() => {
    if (!isMobile) {
      onHideMobileMenu()
    }
  }, [isMobile, onHideMobileMenu])

  const handleActivation = useCallback((element: HTMLElement) => {
    // NOTE (mw): Not sure why this isn't done for us, but focus on autofocus element.
    const autoFocusElement: HTMLDivElement | null = element.querySelector('[data-autofocus]')
    autoFocusElement?.focus()
  }, [])

  return (
    <Box as="header" role="banner" position="sticky" top={0} width="100%" zIndex="sticky">
      <FocusOn
        enabled={isMobile && isMobileMenuOpen}
        autoFocus={true}
        onEscapeKey={onHideMobileMenu}
        onActivation={handleActivation}
      >
        <Box
          as="nav"
          className="top-nav" // used by hooks to calculate useTopNavHeight()
          aria-label="Main"
          colorPalette={colorPalette}
          bg="colorPalette.50"
          borderBottomWidth={2}
          borderColor="colorPalette.200"
          borderStyle="dashed"
        >
          <Flex justifyContent="space-between" px="4" py="2">
            <Flex display={{ base: 'flex', md: 'none' }} alignItems="center" flex="0.25">
              <IconButton
                title="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls={mobileMenuId}
                onClick={onToggleMobileMenu}
                variant="toolbar"
                color="gray.900"
              >
                <Icon boxSize="6">{isMobileMenuOpen ? <FaTimes /> : <FaBars />}</Icon>
              </IconButton>
            </Flex>

            <Flex
              alignItems="center"
              justifyContent={{ base: 'center', md: 'flex-start' }}
              flex="1"
            >
              <Brand onHideMobileMenu={onHideMobileMenu} />
            </Flex>

            <NavBar
              items={topNavItems}
              linkSize="md"
              onHideMobileMenu={onHideMobileMenu}
              container={{
                'aria-label': 'Navigation',
                'aria-orientation': 'horizontal',
                display: { base: 'none', md: 'flex' },
                flex: '1',
                justifyContent: 'center',
                role: 'toolbar',
                gap: '12',
              }}
            />

            <Flex alignItems="center" justifyContent="flex-end" flex={{ base: '0.25', md: '1' }}>
              {!isMobile && <Action onHideMobileMenu={onHideMobileMenu} />}

              {isMobile && !isMobileMenuOpen && MobileAction != null && (
                <MobileAction onHideMobileMenu={onHideMobileMenu} />
              )}
            </Flex>
          </Flex>

          <NavMobileMenu
            {...props}
            id={mobileMenuId}
            show={isMobile && isMobileMenuOpen}
            onHideMobileMenu={onHideMobileMenu}
          />
        </Box>
      </FocusOn>
    </Box>
  )
}
