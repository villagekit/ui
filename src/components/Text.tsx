'use client'

import { Text as BaseText, type TextProps as BaseTextProps, defineRecipe } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface TextProps extends BaseTextProps {
  variant?: 'primary' | 'secondary' | 'tertiary'
}

export const Text = forwardRef<HTMLParagraphElement, TextProps>(function Text(props, ref) {
  return <BaseText ref={ref} {...props} />
})

export const textRecipe = defineRecipe({
  variants: {
    variant: {
      primary: { color: 'gray.900' },
      secondary: { color: 'gray.700' },
      tertiary: { color: 'gray.600' },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
