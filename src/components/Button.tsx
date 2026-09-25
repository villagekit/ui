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
      _hover: { transform: 'scale(1.08)' },
      _active: { transform: 'scale(1)' },
      _focus: { boxShadow: 'outline' },
    },
  },
  variants: {
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
        color: 'gray.700',
        '&:not(:disabled)': {
          _hover: {
            backgroundColor: 'primary.400/10',
            color: 'primary.500',
          },
          _active: { color: 'primary.500' },
        },
        _focus: { color: 'gray.700' },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
