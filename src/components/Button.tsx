'use client'

import {
  Button as BaseButton,
  type ButtonProps as BaseButtonProps,
  defineRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface ButtonProps extends Omit<BaseButtonProps, 'variant' | 'colorPalette'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'toolbar'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
  return <BaseButton ref={ref} {...(props as BaseButtonProps)} />
})

/**
 * The 0.9.0 button on Chakra v2's button sizes (`@chakra-ui/theme` `components/button`: `lg` is
 * 48px tall at font size `lg`, `md` 40px at `md`, `sm` 32px at `sm`, `xs` 24px at `xs`, each as
 * wide at least as it is tall), where Chakra v3's own sizes differ in height and type (`md` is
 * 40px at `sm`, `lg` 44px at `md`). Each size writes `textStyle: 'none'` so v3's text style and
 * its line height stay out of the merge and the base's `1.2` applies, as under v2, and sizes an
 * `svg` inside the button at `1em` of the button's font, Chakra v2's `Icon` size (`w: 1em, h:
 * 1em`), in place of v3's per-size widths (`5`, 20px, at `md`); v3's gaps per size are kept. The
 * icon rule sits in each size because `createSystem` deep-merges this recipe over v3's and cannot
 * delete v3's size-level key, only replace it at the same path. The 0.9.0 recipe wrote no sizes
 * of its own.
 */
export const buttonRecipe = defineRecipe({
  base: {
    borderStyle: 'dashed',
    borderColor: 'transparent',
    borderRadius: 'xl',
    borderWidth: '1px',
    fontFamily: 'heading',
    fontWeight: 'normal',
    transitionDuration: 'fast',
    WebkitTapHighlightColor: 'transparent',
    // The focused button shows the theme's `outline` shadow alone, as under Chakra v2; v3's own
    // recipe draws a gray outline over it through its `focusVisibleRing` utility.
    focusVisibleRing: 'none',
    '&:not(:disabled)': {
      // A pressed button drops back to `scale(1)` while the pointer is still over it, as under
      // Chakra v2, which emitted the active rule after the hover rule. Chakra v3 wraps `_hover`
      // in `@media (hover: hover)` and emits every media rule after the plain rules at equal
      // specificity, so the hover transform would win the press; the active state nested under
      // the hover state is a more specific rule inside the same media block. The plain active
      // rule beside it is the 0.9.0 recipe's own line, kept as the legacy author wrote it.
      _hover: { transform: 'scale(1.08)', _active: { transform: 'scale(1)' } },
      _active: { transform: 'scale(1)' },
      _focus: { boxShadow: 'outline' },
    },
  },
  variants: {
    size: {
      xs: buttonSize('6', 'xs', '2'),
      sm: buttonSize('8', 'sm', '3'),
      md: buttonSize('10', 'md', '4'),
      lg: buttonSize('12', 'lg', '6'),
    },
    variant: {
      primary: {
        color: 'white',
        backgroundColor: 'primary.400',
        '&:not(:disabled)': {
          _hover: {
            backgroundColor: 'primary.500',
            color: 'white',
          },
          _active: { backgroundColor: 'primary.500' },
        },
        _hover: {
          _disabled: { backgroundColor: 'primary.400' },
        },
        _focus: { color: 'white' },
      },
      secondary: {
        color: 'primary.400',
        backgroundColor: 'white',
        borderColor: 'primary.400',
        '&:not(:disabled)': {
          _hover: {
            backgroundColor: 'primary.50',
            borderColor: 'primary.500',
            borderStyle: 'solid',
            color: 'primary.500',
          },
          _active: {
            borderColor: 'primary.500',
            color: 'primary.500',
          },
        },
        _focus: { color: 'primary.400' },
      },
      tertiary: {
        color: 'primary.400',
        '&:not(:disabled)': {
          _hover: {
            backgroundColor: 'primary.400/10',
            color: 'primary.500',
          },
          _active: { color: 'primary.500' },
        },
        _focus: { color: 'primary.500' },
      },
      toolbar: {
        // The rest color is a variable a consumer sets in place of a `color` style prop (the nav
        // toggle's `gray.900`): Chakra v3 emits a style prop outside the `recipes` cascade layer,
        // where it beats the variant's hover, press and focus colors whatever their specificity,
        // while a variable set there leaves those states to win inside the layer, as they did in v2.
        color: 'var(--toolbar-color, {colors.gray.700})',
        '&:not(:disabled)': {
          _hover: {
            backgroundColor: 'primary.400/10',
            color: 'primary.500',
          },
          _active: { color: 'primary.500' },
        },
        // The focus color is a second variable, for a consumer whose focus color is its rest color
        // (the sandbox's off toggles, which erased the v2 variant's focus mapping with an `sx`
        // `_focus: {}`; an empty `_focus` in the v3 `css` prop emits no rule, so it beats nothing).
        _focus: { color: 'var(--toolbar-focus-color, {colors.gray.700})' },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

/**
 * One Chakra v2 button size: a square minimum of `box`, the font size, the horizontal padding
 * and the icon at `1em` of that font. `_icon` is `& :where(svg)`, a rule inside the `recipes`
 * cascade layer, so an explicit `boxSize`, `w` or `h` on an `Icon` still wins as a style prop
 * emitted outside the layer; an `Icon` `size` variant is a rule in the same layer and does not.
 */
function buttonSize(box: string, fontSize: string, paddingX: string) {
  return {
    h: box,
    minW: box,
    textStyle: 'none',
    fontSize,
    px: paddingX,
    _icon: { width: '1em', height: '1em' },
  } as const
}
