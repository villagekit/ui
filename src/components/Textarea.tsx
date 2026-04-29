'use client'

import { Textarea as BaseTextarea, type TextareaProps as BaseTextareaProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface TextareaProps extends BaseTextareaProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    return <BaseTextarea ref={ref} bg="white" {...props} />
  },
)
