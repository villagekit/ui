'use client'

import { NumberInput as BaseNumberInput, type NumberInputRootProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

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
