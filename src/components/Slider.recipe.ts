import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The slider under Chakra v2's theme with the 0.9.0 `sliderTheme`'s pink. Its root is the width
 * of its field, Chakra v2's `container`, which was `100%` wide when horizontal and `100%` tall
 * when vertical; Chakra v3's root has no size, so in a column flex parent that does not stretch
 * its children (a `Field.Root`) it shrinks to nothing. Its control is as tall as its tallest
 * thumb, which `Slider.Root` measures, as v2 measured it, so a thumb sized by its caller sets the
 * root's height, the size's thumb size before the measure. At `md` the track is 4px, v2's, under
 * a 14px thumb. The track is `gray.200`, rounded `xs` (v2's `sm`, 2px), with no inset shadow; the
 * range `primary.300`; the thumb white on a transparent 1px border with the theme's `base`
 * shadow, a pointer over it and the root, scaled 1.15 over 200ms while pressed or dragged, and
 * the theme's `outline` shadow on keyboard focus in place of v3's 3px ring, over v2's
 * transparent 2px outline. The colors, border
 * and shadow sit in the `outline` variant, the default, because Chakra v3's recipe writes its
 * own there and merges the chosen variant over the base, so a base rule loses to them; the
 * `solid` variant, which v2 had not, keeps v3's colors.
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
  base: {
    root: {
      cursor: 'pointer',
    },
    track: {
      borderRadius: 'xs',
    },
    thumb: {
      cursor: 'pointer',
      // Chakra v2 turned the thumb's `outline: 0` into a transparent 2px outline, which forced
      // colors mode still draws on focus; v3's `0` draws nothing.
      outline: '2px solid transparent',
      // The shorthand, since v3's base writes `transition: shadow`: v2's transform over 200ms.
      transition: 'transform 0.2s',
      // zag positions the thumb with an inline `transform`, so the press scale is written after
      // it, as Chakra v2 wrote it after its own translate, and marked important to win over the
      // inline style; the `scale` property would scale that translate too and shift the thumb.
      '&:is(:active, [data-dragging])': {
        transform: 'var(--slider-thumb-transform) scale(1.15)!',
      },
      // v3's base writes `ring` here, which sets the box shadow too; this later key wins.
      _focusVisible: {
        boxShadow: 'outline',
      },
    },
  },
  variants: {
    size: {
      md: {
        root: {
          '--slider-thumb-size': 'sizes.3.5',
          '--slider-track-size': 'sizes.1',
        },
      },
    },
    variant: {
      outline: {
        track: {
          shadow: 'none',
          bg: 'gray.200',
        },
        range: {
          bg: 'primary.300',
        },
        thumb: {
          borderWidth: '1px',
          borderColor: 'transparent',
          bg: 'white',
          boxShadow: 'base',
        },
      },
    },
    orientation: {
      horizontal: {
        root: {
          width: '100%',
        },
        control: {
          minHeight: 'var(--slider-thumb-measured-height, var(--slider-thumb-size))',
        },
      },
      vertical: {
        root: {
          height: '100%',
        },
        control: {
          minWidth: 'var(--slider-thumb-measured-width, var(--slider-thumb-size))',
        },
      },
    },
  },
})
