import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The switch under Chakra v2's theme with the 0.9.0 `switchTheme`'s pink: at `md` a 30 by 16
 * track (22 by 12 at `sm`, 46 by 24 at `lg`) inside a 2px inset, `gray.300` unchecked and `primary.300` checked, its colors fading
 * over the `common` properties in 150ms; a flat white thumb the track's height, sliding over
 * 200ms; and the theme's `outline` shadow on keyboard focus in place of Chakra v3's outline.
 * The track, thumb and focus rules sit in the `solid` variant, the default, because Chakra v3's
 * recipe writes its own there and merges the chosen variant over the base, so a base rule loses
 * to them; the `raised` variant, which v2 had not, keeps v3's look. The thumb stays v3's
 * `colorPalette.contrast` when checked, white on the default palette as v2's was. The track sits at
 * the top of the root, as v2's did in its inline-block root: Chakra v3's root is an `inline-flex`
 * that centers its items, so a root taller than the track (stretched by a caller's flex row, or
 * beside a taller label) would move the track down from the root's top, where v2's stayed flush.
 */
export const switchRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'thumb', 'indicator'],
  base: {
    control: {
      // v3's base writes `transition: backgrounds`, whose curve is v3's; v2's track eased.
      transitionProperty: 'common',
      transitionDuration: 'fast',
      transitionTimingFunction: 'ease',
    },
    thumb: {
      transitionDuration: 'moderate',
    },
  },
  variants: {
    variant: {
      solid: {
        control: {
          // Chakra v2's track: the size's width and height inside a 2px padding.
          boxSizing: 'content-box',
          padding: '0.5',
          alignSelf: 'flex-start',
          bg: 'gray.300',
          focusVisibleRing: 'none',
          _focusVisible: {
            boxShadow: 'outline',
          },
          _checked: {
            bg: 'primary.300',
          },
        },
        thumb: {
          scale: 'none',
          boxShadow: 'none',
        },
      },
    },
    size: {
      sm: {
        root: {
          '--switch-width': '1.375rem',
          '--switch-height': 'sizes.3',
        },
      },
      md: {
        root: {
          '--switch-width': '1.875rem',
          '--switch-height': 'sizes.4',
        },
      },
      lg: {
        root: {
          '--switch-width': '2.875rem',
          '--switch-height': 'sizes.6',
        },
      },
    },
  },
})
