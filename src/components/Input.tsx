'use client'

import { Input as BaseInput, type InputProps as BaseInputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface InputProps extends BaseInputProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return <BaseInput ref={ref} bg="white" {...props} />
})
