// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-nav/src/components/NavMobileMenu.tsx
'use client'

import { Flex } from '@chakra-ui/react'
import { type Variants, motion } from 'motion/react'

import type { NavHeaderProps } from './NavHeader'
import { NavList } from './NavList'
import { useNavContext } from './context'
import { useTopNavHeight } from './hooks'

/**
 * What `NavHeader` renders the panel with: its own props (`Action` and `colorPalette` are read here,
 * `Brand` and `MobileAction` are not) and the panel's state and id.
 */
export interface NavMobileMenuProps extends NavHeaderProps {
  /** Whether the panel is shown; `NavHeader` shows it only below the `md` breakpoint. */
  show: boolean
  /** The panel's id, which the header toggle names in its `aria-controls`. */
  id: string
  /** Closes the menu; passed to every link and to the action, so a navigation closes it. */
  onHideMobileMenu?: () => void
}

// TODO handle menu keyboard interactions:
//  https://chakra-ui.com/docs/components/menu#keyboard-interaction

// Chakra v2's `Slide` with `direction="left"`: in on a spring, out over 150ms on its ease-in-out.
const slideVariants: Variants = {
  enter: { x: 0, y: 0, transition: { type: 'spring', damping: 25, stiffness: 180 } },
  exit: { x: '-100%', y: 0, transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] } },
}

/**
 * The mobile nav panel: every nav item from `NavContextProvider` and the header action, sliding
 * in from the left under the sticky header and filling the viewport below it.
 */
export function NavMobileMenu(props: NavMobileMenuProps) {
  const { Action, show, id, colorPalette = 'accentB', onHideMobileMenu } = props

  const topNavHeight = useTopNavHeight()
  const { mobileItems } = useNavContext()

  return (
    // The slide's fixed full-width layer under the header, always mounted; the panel inside it is
    // hidden while closed, so the layer slides out empty and the focus lock finds the panel shown.
    <motion.div
      initial="exit"
      animate={show ? 'enter' : 'exit'}
      variants={slideVariants}
      style={{ position: 'fixed', left: 0, top: topNavHeight, bottom: 0, width: '100%' }}
    >
      <Flex
        id={id}
        hidden={!show}
        role="toolbar"
        aria-orientation="vertical"
        aria-label="Navigation"
        data-autofocus
        tabIndex={-1}
        display={show ? 'flex' : 'none'}
        direction="column"
        justifyContent="space-between"
        colorPalette={colorPalette}
        bg="colorPalette.50"
        height="100%"
        overflow="hidden auto"
        px="4"
      >
        <NavList
          items={mobileItems}
          linkSize="lg"
          onHideMobileMenu={onHideMobileMenu}
          containerProps={{
            alignItems: 'flex-start',
            py: 4,
          }}
          gap="4"
        />

        <Flex py="4">
          <Action onHideMobileMenu={onHideMobileMenu} />
        </Flex>
      </Flex>
    </motion.div>
  )
}
