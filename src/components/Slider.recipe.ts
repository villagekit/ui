import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The slider's filled range in `primary.300`, the 0.9.0 `sliderTheme`'s pink over Chakra v2's
 * `colorScheme` track, and its root the width of its field, Chakra v2's `container`, which was
 * `100%` wide when horizontal and `100%` tall when vertical; Chakra v3's root has no size, so
 * in a column flex parent that does not stretch its children (a `Field.Root`) it shrinks to
 * nothing. The pink sits in the `outline` variant, the default, because Chakra v3's recipe
 * writes the range's `colorPalette.solid` there and merges the chosen variant over the base, so
 * a base color loses to it; the `solid` variant, which v2 had not, keeps v3's colors.
 */
export const sliderRecipe = defineSlotRecipe({
  slots: [
    'root',
    'label',
    'control',
    'track',
    'range',
    'thumb',
    'valueText',
    'marker',
    'markerGroup',
    'markerIndicator',
  ],
  variants: {
    variant: {
      outline: {
        range: {
          bg: 'primary.300',
        },
      },
    },
    orientation: {
      horizontal: {
        root: {
          width: '100%',
        },
      },
      vertical: {
        root: {
          height: '100%',
        },
      },
    },
  },
})
