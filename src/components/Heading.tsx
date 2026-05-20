'use client'

import {
  Heading as BaseHeading,
  type HeadingProps as BaseHeadingProps,
  defineRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface HeadingProps extends BaseHeadingProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(props, ref) {
  return <BaseHeading ref={ref} {...props} />
})

// Chakra v3's default heading sizes are uniformly smaller than v2 — `size="4xl"`
// renders fontSize 4xl (36 px) instead of v2's `['6xl', null, '7xl']` (60–72 px).
// Restoring the v2 responsive scale keeps the Village Kit aesthetic across sites,
// and `semibold` matches the only Fredoka weight (`600`) the Village Kit sites
// load via `next/font`. `textStyle: 'none'` neutralizes Chakra's default
// textStyle on the variants we override, so `letterSpacing` from textStyle.4xl
// (etc.) can't bleed through the merged recipe.
export const headingRecipe = defineRecipe({
  className: 'chakra-heading',
  base: {
    fontFamily: 'heading',
    fontWeight: 'semibold',
  },
  variants: {
    size: {
      xs: { textStyle: 'none', fontSize: 'sm', lineHeight: '1.2' },
      sm: { textStyle: 'none', fontSize: 'md', lineHeight: '1.2' },
      md: { textStyle: 'none', fontSize: 'lg', lineHeight: '1.2' },
      lg: {
        textStyle: 'none',
        fontSize: { base: 'xl', md: '2xl' },
        lineHeight: { base: '1.33', md: '1.2' },
      },
      xl: {
        textStyle: 'none',
        fontSize: { base: '3xl', md: '4xl' },
        lineHeight: { base: '1.33', md: '1.2' },
      },
      '2xl': {
        textStyle: 'none',
        fontSize: { base: '4xl', md: '5xl' },
        lineHeight: { base: '1.2', md: '1' },
      },
      '3xl': {
        textStyle: 'none',
        fontSize: { base: '5xl', md: '6xl' },
        lineHeight: '1',
      },
      '4xl': {
        textStyle: 'none',
        fontSize: { base: '6xl', md: '7xl' },
        lineHeight: '1',
      },
    },
  },
  defaultVariants: {
    size: 'xl',
  },
})
