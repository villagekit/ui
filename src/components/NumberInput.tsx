'use client'

import {
  NumberInput as BaseNumberInput,
  type NumberInputControlProps,
  type NumberInputDecrementTriggerProps,
  type NumberInputIncrementTriggerProps,
  type NumberInputRootProps,
  defineSlotRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { inputRecipe, inputVariants } from './Input'

export type {
  NumberInputRootProps as NumberInputProps,
  NumberInputControlProps,
  NumberInputInputProps,
  NumberInputIncrementTriggerProps,
  NumberInputDecrementTriggerProps,
} from '@chakra-ui/react'

/**
 * The number input's root, white under every variant but `flushed`, where it is transparent so the
 * underlined field shows the surface it sits on, the background the 0.9.0 wrapper passed. A
 * caller's own `bg` still wins. The wrapper reads a plain `variant` as the 0.9.0 one did, so a
 * responsive `variant` object reads as not `flushed`.
 */
const Root = forwardRef<HTMLDivElement, NumberInputRootProps>(function NumberInputRoot(props, ref) {
  const { variant } = props
  return (
    <BaseNumberInput.Root
      ref={ref}
      bg={variant === 'flushed' ? 'transparent' : 'white'}
      {...props}
    />
  )
})

/**
 * Chakra v2's stepper glyphs, the 0.9.0 number input's: filled triangles on the 24-unit viewBox
 * in the stepper's color, unfocusable as v2's `Icon` rendered them. Chakra v3's default children
 * are 2px stroked chevrons. The paths are ported from
 * https://github.com/chakra-ui/chakra-ui/blob/4e2df65/packages/components/number-input/src/icons.tsx
 */
const triangleUp = (
  // biome-ignore lint/a11y/noSvgWithoutTitle: legacy's markup; the trigger carries the name
  <svg viewBox="0 0 24 24" focusable="false">
    <path
      fill="currentColor"
      d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
    />
  </svg>
)

const triangleDown = (
  // biome-ignore lint/a11y/noSvgWithoutTitle: legacy's markup; the trigger carries the name
  <svg viewBox="0 0 24 24" focusable="false">
    <path
      fill="currentColor"
      d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
    />
  </svg>
)

/**
 * Chakra v3's triggers with the 0.9.0 glyphs as their default children; a child passed in
 * replaces it, the way Chakra's own default child does. The glyph's size and color are the
 * recipe's (`numberInputRecipe`).
 */
const IncrementTrigger = forwardRef<HTMLButtonElement, NumberInputIncrementTriggerProps>(
  function NumberInputIncrementTrigger(props, ref) {
    const { children = triangleUp, ...rest } = props
    return (
      <BaseNumberInput.IncrementTrigger ref={ref} {...rest}>
        {children}
      </BaseNumberInput.IncrementTrigger>
    )
  },
)

const DecrementTrigger = forwardRef<HTMLButtonElement, NumberInputDecrementTriggerProps>(
  function NumberInputDecrementTrigger(props, ref) {
    const { children = triangleDown, ...rest } = props
    return (
      <BaseNumberInput.DecrementTrigger ref={ref} {...rest}>
        {children}
      </BaseNumberInput.DecrementTrigger>
    )
  },
)

/**
 * Chakra v3's control with the two triggers above as its default children, so a bare
 * `<NumberInput.Control />` renders the 0.9.0 glyphs where Chakra's renders its chevrons.
 */
const Control = forwardRef<HTMLDivElement, NumberInputControlProps>(
  function NumberInputControl(props, ref) {
    const {
      children = (
        <>
          <IncrementTrigger />
          <DecrementTrigger />
        </>
      ),
      ...rest
    } = props
    return (
      <BaseNumberInput.Control ref={ref} {...rest}>
        {children}
      </BaseNumberInput.Control>
    )
  },
)

export const NumberInput = {
  Root,
  Input: BaseNumberInput.Input,
  Control,
  IncrementTrigger,
  DecrementTrigger,
  Label: BaseNumberInput.Label,
  Scrubber: BaseNumberInput.Scrubber,
  ValueText: BaseNumberInput.ValueText,
}

/**
 * Chakra v2's stepper (`@chakra-ui/theme` `components/number-input`, with the `StyledStepper`
 * base style of `@chakra-ui/number-input@2.1.2`): its own 1px start border in the border color,
 * the body text color, transparent at rest and under the pointer (v3 fills `bg.muted` on hover,
 * blanked here), `gray.200` while pressed, `0.4` opacity under `not-allowed` when disabled, the
 * `common` properties over v2's `normal` duration (v3's `moderate`), a pointer cursor and a
 * `normal` line height. The pressed fill sits under the hover state as well as beside it: Chakra
 * v3 emits the hover rule inside `@media (hover: hover)` after the active rule, so a press under
 * the pointer would otherwise keep the hover's transparent fill (the button recipe's press has
 * the same nesting). Its glyph is 1em of `xs` (12px) at every size: v2 meant three quarters of
 * the field's font size, but read the size through a CSS variable and fell back to `md`, so
 * every size rendered 12px, and the live 0.9.0 site reads 12px on its `sm` inputs.
 */
const stepper = {
  borderStart: '1px solid',
  borderStartColor: 'border',
  color: 'fg',
  bg: 'transparent',
  fontSize: 'xs',
  lineHeight: 'normal',
  cursor: 'pointer',
  transitionProperty: 'common',
  transitionDuration: 'moderate',
  _hover: { bg: 'transparent', _active: { bg: 'gray.200' } },
  _active: { bg: 'gray.200' },
  _disabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
} as const

/**
 * The number input's field on the `inputRecipe`'s base, sizes and variants, the way Chakra v2's
 * number input took the input theme's, and its stepper column as v2's: 24px wide at every size
 * (v3 steps it 16px to 24px by size), the width set on the root as v2 set it, so the field's end
 * padding can read it (v3 sets it on the control alone, a sibling the field cannot read), with
 * the field padded at its end for the column plus 0.5rem under every variant (each size writes
 * the padding as a two-value `px`, see `numberInputSize`, and the flushed variant its own, start
 * `0` and the column, replacing v3's `px: 0` key). The column carries no border of its own, each
 * stepper draws its own start border (see `stepper`), and the lower one overlaps the upper by one
 * pixel under a 1px top border, v2's `_last` stepper. The steppers' outer corners take the size's
 * radius, v2's `sm` for `xs` and `sm` (v3's `xs`) and `md` above.
 */
export const numberInputRecipe = defineSlotRecipe({
  className: 'chakra-number-input',
  slots: [
    'root',
    'label',
    'input',
    'control',
    'valueText',
    'incrementTrigger',
    'decrementTrigger',
    'scrubber',
  ],
  base: {
    root: { '--stepper-width': 'sizes.6' },
    input: inputRecipe.base,
    control: {
      borderStartWidth: '0px',
    },
    incrementTrigger: stepper,
    decrementTrigger: {
      ...stepper,
      mt: '-1px',
      borderTopWidth: '1px',
    },
  },
  variants: {
    size: {
      xs: numberInputSize('xs', '2', 'xs'),
      sm: numberInputSize('sm', '3', 'xs'),
      md: numberInputSize('md', '4', 'md'),
      lg: numberInputSize('lg', '4', 'md'),
    },
    variant: {
      outline: { input: inputVariants.outline },
      flushed: {
        input: {
          ...inputVariants.flushed,
          px: '0 calc(var(--stepper-width) + 0.5rem)',
        },
      },
    },
  },
})

/**
 * One size of the number input: the input recipe's size with its `px` rewritten as two values,
 * the size's start padding and the column's end padding, since the size's own `px` is emitted
 * after the base's end padding and would beat it, and a `pe` written here would merge into the
 * base's own `pe` key, ahead of the `px` (the token reference resolves the spacing); the column's
 * width repeated on the control, where Chakra v3's size writes its narrower one and a variant
 * beats the base; and the steppers' outer corners at the size's radius.
 */
function numberInputSize(size: 'xs' | 'sm' | 'md' | 'lg', paddingX: string, radius: 'xs' | 'md') {
  return {
    input: {
      ...inputRecipe.variants?.size[size],
      px: `{spacing.${paddingX}} calc(var(--stepper-width) + 0.5rem)`,
    },
    control: { '--stepper-width': 'sizes.6' },
    incrementTrigger: { borderTopEndRadius: radius },
    decrementTrigger: { borderBottomEndRadius: radius },
  }
}
