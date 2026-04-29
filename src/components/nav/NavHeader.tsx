'use client'

import { Box, Flex, Icon, useDisclosure } from '@chakra-ui/react'
import type { FC } from 'react'
import { useEffect } from 'react'
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

export function NavHeader(props: NavHeaderProps) {
  const { Brand, Action, MobileAction, colorPalette = 'accentB' } = props

  const { open, onClose, onToggle } = useDisclosure()

  const isMobile = useIsMobile()
  const { topItems } = useNavContext()

  useEffect(() => {
    if (!isMobile) onClose()
  }, [isMobile, onClose])

  return (
    <Box as="header" role="banner" position="sticky" top={0} width="100%" zIndex="sticky">
      <Box
        as="nav"
        // Used by `useTopNavHeight()` to compute scroll-margin offsets.
        className="top-nav"
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
              title={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={onToggle}
              variant="toolbar"
              color="gray.900"
            >
              <Icon boxSize="6">{open ? <FaTimes /> : <FaBars />}</Icon>
            </IconButton>
          </Flex>

          <Flex alignItems="center" justifyContent={{ base: 'center', md: 'flex-start' }} flex="1">
            <Brand onHideMobileMenu={onClose} />
          </Flex>

          <NavBar
            items={topItems}
            linkSize="md"
            onHideMobileMenu={onClose}
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
            {!isMobile && <Action onHideMobileMenu={onClose} />}
            {isMobile && !open && MobileAction != null && (
              <MobileAction onHideMobileMenu={onClose} />
            )}
          </Flex>
        </Flex>
      </Box>

      <NavMobileMenu
        open={isMobile && open}
        onClose={onClose}
        Action={Action}
        colorPalette={colorPalette}
      />
    </Box>
  )
}
