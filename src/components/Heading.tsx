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

/**
 * Chakra v2's heading scale (`@chakra-ui/theme` `components/heading`: `md` is `xl` on a 1.2 line,
 * `lg` to `4xl` step up at the `md` breakpoint), which Chakra v3's textStyle-based sizes shrank.
 * `textStyle: 'none'` keeps the default textStyle's letterSpacing out of the merged recipe. The
 * weight is `normal`, as the 0.9.0 theme set it: a site that loads one face of the heading font
 * renders that face whatever weight is asked for.
 */
export const headingRecipe = defineRecipe({
  className: 'chakra-heading',
  base: {
    fontFamily: 'heading',
    fontWeight: 'normal',
  },
  variants: {
    size: {
      xs: { textStyle: 'none', fontSize: 'sm', lineHeight: '1.2' },
      sm: { textStyle: 'none', fontSize: 'md', lineHeight: '1.2' },
      md: { textStyle: 'none', fontSize: 'xl', lineHeight: '1.2' },
      lg: {
        textStyle: 'none',
        fontSize: { base: '2xl', md: '3xl' },
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
