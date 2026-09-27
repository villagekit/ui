'use client'

import {
  Input as BaseInput,
  type InputProps as BaseInputProps,
  defineRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface InputProps extends BaseInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <BaseInput ref={ref} bg="white" {...props} />
})

/**
 * Chakra v2's input variants where they differ from Chakra v3's, shared by the input and number
 * input recipes (the number input's `input` slot takes them, since Chakra v3 copies its own input
 * recipe into the number input's when the package loads, before this one is merged over it). The
 * `outline` field, the default, darkens its border to `gray.300` under the pointer, as v2's did;
 * v3 writes no hover on any variant, and the hover sits in the variant because v2 put it there,
 * so `subtle` and `flushed` keep none. The invalid and focus borders are written under the hover
 * state too, in that order: Chakra v3 emits the hover rule inside `@media (hover: hover)` after
 * the invalid and focus rules, so an invalid or focused field under the pointer would otherwise
 * keep the hover border where v2, which emitted hover before invalid before focus, showed the
 * error color, and the focus color over it. The `flushed` field keeps the focus color on its
 * underline and one-pixel shadow while a focused value is invalid: v2 wrote its `_invalid` before
 * its `_focusVisible`, so focus won; v3's flushed variant nests `_invalid` under `_focusVisible`
 * and turns both red, and the two keys here replace v3's through the theme merge.
 */
export const inputVariants = {
  outline: {
    _hover: {
      borderColor: 'gray.300',
      _invalid: { borderColor: 'var(--error-color)' },
      _focusVisible: { borderColor: 'var(--focus-color)' },
    },
  },
  flushed: {
    _focusVisible: {
      _invalid: {
        borderColor: 'var(--focus-color)',
        boxShadow: '0px 1px 0px 0px var(--focus-color)',
      },
    },
  },
} as const

/**
 * Chakra v2's input sizes (`@chakra-ui/theme` `components/input`: `lg` is 48px tall at font size
 * `lg`, `md` 40px, `sm` 32px, `xs` 24px, rounded `md` down to `sm`, which is v3's `xs`), which
 * Chakra v3's own sizes shrank and re-rounded. The field carries v2's input base too: its colors,
 * border and shadow fade over the `common` properties at v2's `normal` duration (v3's `moderate`,
 * 200ms), so the hover border and the focus ring ease in, and disabled it sits at v2's `0.4`
 * opacity under `not-allowed` (v3's `disabled` layer style is `0.5`; the opacity here is emitted
 * after it in the same block, so it wins). The focused field takes the theme's `outlineColor`
 * as a border with a one-pixel shadow, the way the 0.9.0 wrappers passed `focusBorderColor`,
 * and no focus outline over it: v3's variants draw their ring through the `focusVisibleRing`
 * utility, which `none` turns off. The number input recipe mirrors it, since Chakra v3 copies its
 * own input recipe into the number input's when the package loads, before this one is merged over
 * it; the native select has sizes of its own and mirrors the focus.
 */
export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    transitionProperty: 'common',
    transitionDuration: 'moderate',
    '--focus-color': 'colors.outlineColor',
    focusVisibleRing: 'none',
    _focusVisible: {
      borderColor: 'var(--focus-color)',
      boxShadow: '0 0 0 1px var(--focus-color)',
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  },
  variants: {
    size: {
      xs: { ...inputSize('xs', '2', 'xs'), '--input-height': 'sizes.6' },
      sm: { ...inputSize('sm', '3', 'xs'), '--input-height': 'sizes.8' },
      md: { ...inputSize('md', '4', 'md'), '--input-height': 'sizes.10' },
      lg: { ...inputSize('lg', '4', 'md'), '--input-height': 'sizes.12' },
    },
    variant: inputVariants,
  },
})

/**
 * The typographic half of one input size, shared by the input, select and number input recipes:
 * `textStyle: 'none'` keeps v3's textStyle line height out of the merge.
 */
export function inputSize(fontSize: string, paddingX: string, borderRadius: string) {
  return { textStyle: 'none', fontSize, px: paddingX, borderRadius } as const
}
