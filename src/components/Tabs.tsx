'use client'

import {
  TabsList as BaseTabsList,
  TabsContent,
  TabsContentGroup,
  TabsIndicator,
  type TabsListProps,
  TabsRoot,
  TabsTrigger,
  defineSlotRecipe,
  mergeRefs,
} from '@chakra-ui/react'
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps as TabsProps,
  TabsTriggerProps,
} from '@chakra-ui/react'

const isClient = typeof window !== 'undefined'
const useSafeLayoutEffect = isClient ? useLayoutEffect : useEffect

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(props, ref) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [fadeOut, setFadeOut] = useState(false)

  const updateFadeOut = useCallback(() => {
    if (tabsRef.current != null) {
      const { clientWidth, scrollWidth } = tabsRef.current
      setFadeOut(scrollWidth > clientWidth)
    }
  }, [])

  useSafeLayoutEffect(() => {
    updateFadeOut()
    window.addEventListener('resize', updateFadeOut)
    return () => {
      window.removeEventListener('resize', updateFadeOut)
    }
  }, [updateFadeOut])

  return (
    <BaseTabsList
      ref={mergeRefs(tabsRef, ref)}
      css={
        fadeOut
          ? {
              '&::before': {
                content: '""',
                position: 'absolute',
                zIndex: 5,
                top: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), white 85%)',
                width: '16',
              },
            }
          : undefined
      }
      {...props}
    />
  )
})

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  ContentGroup: TabsContentGroup,
  Indicator: TabsIndicator,
}

/**
 * The 0.9.0 `tabsTheme` under Chakra v2's `unstyled` variant, which the 0.9.0 wrapper set on
 * every `Tabs`: the list's dashed rule, the triggers in the heading font at the body's weight,
 * each on its own dashed border, `primary.300` under the selected one and `primary.700` under
 * the pointer, their colors fading over the `common` properties in 200ms and the theme's
 * `outline` shadow on an unselected trigger under keyboard focus; at `lg`, Chakra v2's size.
 * The `unstyled` variant here writes nothing, as v2's did, and is the recipe's
 * default, so `Tabs.Root` renders it with no `variant` prop, and only that way: Chakra v3's
 * `variant` prop is typed to its own five names, which the recipe cannot widen, so
 * `variant="unstyled"` does not type-check. Chakra v3's own variants stay available by name,
 * its default `line` among them, which writes a solid rule under the list, `fg.muted` on the
 * unselected triggers and a solid indicator under the selected one.
 */
export const tabsRecipe = defineSlotRecipe({
  slots: ['root', 'list', 'trigger', 'content', 'indicator', 'contentGroup'],
  base: {
    root: {
      position: 'relative',
    },
    list: {
      // Chakra v2's `TabList` wrote `display: flex` itself, so the rule after the triggers
      // reached the list's far edge; v3's base writes `inline-flex`, under which it has no room.
      display: 'flex',
      marginBottom: '2',
      overflowX: 'auto',
      '&::after': {
        borderBottomWidth: '2px',
        borderStyle: 'dashed',
        content: '""',
        display: 'block',
        flex: '1',
      },
    },
    trigger: {
      borderBottomWidth: '2px',
      borderStyle: 'dashed',
      fontFamily: 'heading',
      // Chakra v2's tab wrote no weight, so the body's applied; v3's base writes `medium`.
      fontWeight: 'normal',
      marginRight: '1',
      position: 'relative',
      whiteSpace: 'nowrap',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      _hover: { color: 'primary.700' },
      // On `:focus` alone, not Chakra v3's `_focus`, which also matches `[data-focus]`: zag
      // marks the selected trigger focused before any focus event, so the selected tab would
      // take the focus color at rest, which Chakra v2's tab never did.
      '&:focus': { color: 'primary.700' },
      // Chakra v2's tab carried a transparent 2px outline, which forced colors mode draws on
      // focus; v3's trigger writes `outline: 0`, which draws nothing.
      outline: '2px solid transparent',
      // Chakra v2's keyboard focus: the theme's `outline` shadow, which the selected trigger's
      // `boxShadow: none` blanked, so only an unselected trigger shows it.
      _focusVisible: {
        outline: '2px solid transparent',
        outlineColor: 'transparent',
        boxShadow: 'outline',
        _selected: { boxShadow: 'none' },
      },
      _selected: {
        borderColor: 'primary.300',
        boxShadow: 'none',
        zIndex: 10,
      },
      _disabled: {
        color: 'gray.300',
        cursor: 'not-allowed',
      },
    },
    content: {
      padding: '4',
      position: 'relative',
      zIndex: 10,
    },
  },
  variants: {
    variant: {
      unstyled: {},
    },
    size: {
      // Chakra v2's `lg` tab: 18px type on 12px by 16px padding, as tall as its text, with no
      // minimum width or gap, and the panel padded 16px; Chakra v3's `lg` fixes the list and the
      // triggers at 44px through `--tabs-height` and writes a text style, a gap and 18px panels.
      lg: {
        root: {
          '--tabs-height': 'auto',
          '--tabs-content-padding': 'spacing.4',
        },
        trigger: {
          textStyle: 'none',
          fontSize: 'lg',
          gap: 'normal',
          py: '3',
          px: '4',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'unstyled',
  },
})
