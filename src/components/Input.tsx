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
 * Chakra v2's input sizes (`@chakra-ui/theme` `components/input`: `lg` is 48px tall at font size
 * `lg`, `md` 40px, `sm` 32px, `xs` 24px, rounded `md` down to `sm`, which is v3's `xs`), which
 * Chakra v3's own sizes shrank and re-rounded. The focused field takes the theme's `outlineColor`
 * as a border with a one-pixel shadow, the way the 0.9.0 wrappers passed `focusBorderColor`,
 * and no focus outline over it: v3's variants draw their ring through the `focusVisibleRing`
 * utility, which `none` turns off. The number input recipe mirrors it, since Chakra v3 copies its
 * own input recipe into the number input's when the package loads, before this one is merged over
 * it; the native select has sizes of its own and mirrors the focus.
 */
export const inputRecipe = defineRecipe({
  className: 'chakra-input',
  base: {
    '--focus-color': 'colors.outlineColor',
    focusVisibleRing: 'none',
    _focusVisible: {
      borderColor: 'var(--focus-color)',
      boxShadow: '0 0 0 1px var(--focus-color)',
    },
  },
  variants: {
    size: {
      xs: { ...inputSize('xs', '2', 'xs'), '--input-height': 'sizes.6' },
      sm: { ...inputSize('sm', '3', 'xs'), '--input-height': 'sizes.8' },
      md: { ...inputSize('md', '4', 'md'), '--input-height': 'sizes.10' },
      lg: { ...inputSize('lg', '4', 'md'), '--input-height': 'sizes.12' },
    },
  },
})

/**
 * The typographic half of one input size, shared by the input, select and number input recipes:
 * `textStyle: 'none'` keeps v3's textStyle line height out of the merge.
 */
export function inputSize(fontSize: string, paddingX: string, borderRadius: string) {
  return { textStyle: 'none', fontSize, px: paddingX, borderRadius } as const
}
