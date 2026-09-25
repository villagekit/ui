'use client'

import {
  NumberInput as BaseNumberInput,
  type NumberInputRootProps,
  defineSlotRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'
import { inputRecipe } from './Input'

export type {
  NumberInputRootProps as NumberInputProps,
  NumberInputControlProps,
  NumberInputInputProps,
} from '@chakra-ui/react'

const Root = forwardRef<HTMLDivElement, NumberInputRootProps>(function NumberInputRoot(props, ref) {
  return <BaseNumberInput.Root ref={ref} bg="white" {...props} />
})

export const NumberInput = {
  Root,
  Input: BaseNumberInput.Input,
  Control: BaseNumberInput.Control,
  IncrementTrigger: BaseNumberInput.IncrementTrigger,
  DecrementTrigger: BaseNumberInput.DecrementTrigger,
  Label: BaseNumberInput.Label,
  Scrubber: BaseNumberInput.Scrubber,
  ValueText: BaseNumberInput.ValueText,
}

/**
 * The number input's field on the `inputRecipe`'s sizes and focus, the way Chakra v2's number
 * input took the input theme's.
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
    input: inputRecipe.base,
  },
  variants: {
    size: {
      xs: { input: inputRecipe.variants?.size.xs },
      sm: { input: inputRecipe.variants?.size.sm },
      md: { input: inputRecipe.variants?.size.md },
      lg: { input: inputRecipe.variants?.size.lg },
    },
  },
})
