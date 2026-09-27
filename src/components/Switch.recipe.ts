import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The switch's checked track in `primary.300`, the 0.9.0 `switchTheme`'s pink over Chakra v2's
 * `colorScheme` track. It sits in the `solid` variant, the default, because Chakra v3's recipe
 * writes the checked `colorPalette.solid` there and merges the chosen variant over the base, so
 * a base color loses to it; the `raised` variant, which v2 had not, keeps v3's checked color.
 * The thumb stays v3's, white on the default palette as v2's was.
 */
export const switchRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'thumb', 'indicator'],
  variants: {
    variant: {
      solid: {
        control: {
          _checked: {
            bg: 'primary.300',
          },
        },
      },
    },
  },
})
