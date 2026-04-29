'use client'

import { Drawer, Flex, Icon, Portal } from '@chakra-ui/react'
import type { FC } from 'react'
import { FaTimes } from 'react-icons/fa'

import { IconButton } from '../IconButton'
import { NavList } from './NavList'
import { useNavContext } from './context'
import type { NavActionProps } from './types'

export interface NavMobileMenuProps {
  open: boolean
  onClose: () => void
  Action: FC<NavActionProps>
  colorPalette?: string
}

/**
 * Slides in from the start edge as a Drawer. Drawer (powered by Ark UI dialog)
 * handles focus trap, ESC dismissal, and aria-modal automatically — no need
 * for `react-focus-on` or manual `onEscapeKey` wiring.
 */
export function NavMobileMenu(props: NavMobileMenuProps) {
  const { open, onClose, Action, colorPalette = 'accentB' } = props

  const { mobileItems } = useNavContext()

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(details) => {
        if (!details.open) onClose()
      }}
      placement="start"
      size="xs"
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content colorPalette={colorPalette} bg="colorPalette.50">
            <Drawer.Body p="4">
              <Flex
                direction="column"
                justifyContent="space-between"
                aria-label="Navigation"
                aria-orientation="vertical"
                role="toolbar"
                h="full"
              >
                <Flex direction="column">
                  <Flex justifyContent="flex-end" mb="2">
                    <Drawer.CloseTrigger asChild>
                      <IconButton title="Close menu" variant="toolbar" color="gray.900">
                        <Icon boxSize="6">
                          <FaTimes />
                        </Icon>
                      </IconButton>
                    </Drawer.CloseTrigger>
                  </Flex>

                  <NavList
                    items={mobileItems}
                    linkSize="lg"
                    onHideMobileMenu={onClose}
                    containerProps={{ alignItems: 'flex-start', py: 2 }}
                    gap="4"
                  />
                </Flex>

                <Flex py="4">
                  <Action onHideMobileMenu={onClose} />
                </Flex>
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
