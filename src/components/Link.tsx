'use client'

import { Link as BaseLink, type LinkProps as BaseLinkProps, defineRecipe } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface LinkProps extends Omit<BaseLinkProps, 'variant' | 'colorPalette'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'paragraph'
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent focus state from applying to links on click
    e.preventDefault()
  }

  return <BaseLink ref={ref} onMouseDown={handleMouseDown} {...(props as BaseLinkProps)} />
})

export const linkRecipe = defineRecipe({
  base: {
    outline: 'none',
    borderRadius: 'md',
    _hover: {
      color: 'primary.700',
      textDecoration: 'none',
    },
  },
  variants: {
    variant: {
      primary: { color: 'accentA.600' },
      secondary: { color: 'gray.900' },
      tertiary: { color: 'gray.700' },
      paragraph: {
        color: 'accentA.800',
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
        _hover: { textDecoration: 'underline' },
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})
