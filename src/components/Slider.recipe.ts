import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The slider under Chakra v2's theme with the 0.9.0 `sliderTheme`'s pink. Its root is Chakra v2's
 * `container`, an `inline-block` the width of its field when horizontal and the height of its field
 * when vertical, so in a block field it sits in a line box on the field's line, on the line's
 * baseline, as v2's did; Chakra v3's root is a flex column with no size, which in a column flex
 * parent that does not stretch its children shrinks to nothing and in a block parent forms no line
 * box. The control is a block-level flex row inside it, so it still spans the root and still grows
 * the root by its marks. The root's baseline is the control's, and Chromium and Firefox both take a
 * flex row's baseline from the bottom edge of its first item (an item at its end pins nothing,
 * measured in both), which for the control would be the centered track, 10px above the root's
 * bottom at the engine's 24px thumb; v2's root held only absolutely positioned parts, so its
 * baseline was its bottom edge. The horizontal control's `::before`, an empty item of no height
 * aligned at the cross end, is that first item, so the root's baseline is the control's bottom edge
 * again and the line box around it is v2's (the strut's descent below the slider); with marker
 * labels, v3's 16px control margin sits below that edge. The vertical control's first item, the
 * track, already spans it to the bottom. The control is as tall as its tallest thumb, which
 * `Slider.Root` measures, as v2 measured it, so a thumb sized by its caller sets the root's height,
 * the size's thumb size before the measure. At `md` the track is 4px, v2's, under a 14px thumb. The
 * track is `gray.200`, rounded `xs` (v2's `sm`, 2px), with no inset shadow; the range
 * `primary.300`; the thumb white on a transparent 1px border with the theme's `base` shadow, a
 * pointer over it and the root, scaled 1.15 over 200ms while pressed or dragged, and the theme's
 * `outline` shadow on keyboard focus in place of v3's 3px ring, over v2's transparent 2px outline.
 * The colors, border and shadow sit in the `outline` variant, the default, because Chakra v3's
 * recipe writes its own there and merges the chosen variant over the base, so a base rule loses to
 * them; the `solid` variant, which v2 had not, keeps v3's colors.
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
      display: 'inline-block',
      cursor: 'pointer',
    },
    control: {
      // Block-level where v3's is `inline-flex`, so the control spans an inline-block root.
      display: 'flex',
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
          // The first flex item, at the control's bottom edge: the baseline the root takes.
          '&::before': {
            content: '""',
            alignSelf: 'flex-end',
            height: '0',
          },
        },
      },
      vertical: {
        root: {
          // v3's vertical variant writes `inline-flex` here, over the base.
          display: 'inline-block',
          height: '100%',
        },
        control: {
          minWidth: 'var(--slider-thumb-measured-width, var(--slider-thumb-size))',
        },
      },
    },
  },
})
