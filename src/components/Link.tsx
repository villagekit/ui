'use client'

import { Link as BaseLink, type LinkProps as BaseLinkProps, defineRecipe } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface LinkProps extends Omit<BaseLinkProps, 'variant' | 'colorPalette'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'paragraph'
  /** Open the link in a new tab with `rel="noopener"`, what Chakra v2's `Link` rendered for `isExternal`. */
  isExternal?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
  const { isExternal, ...restProps } = props

  const handleMouseDown = (e: React.MouseEvent) => {
    // Prevent focus state from applying to links on click
    e.preventDefault()
  }

  return (
    <BaseLink
      ref={ref}
      onMouseDown={handleMouseDown}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      {...(restProps as BaseLinkProps)}
    />
  )
})

/**
 * The 0.9.0 link on Chakra v2's link base (`@chakra-ui/theme` `components/link`): the `common`
 * transition over 150ms on v2's ease-out curve (v3's `ease-out` token is a different curve, so the
 * curve is written out) and the theme's `outline` shadow on keyboard focus. v3's recipe draws a
 * gray outline on any focus through its `focusRing` utility, which is set to `none` here, and
 * lays the link out `inline-flex`, an atomic box that moves whole onto the next line; v2's wrote
 * no display rule, so a link is `inline` and breaks across lines with its sentence (v3's
 * `alignItems` and `gap` do nothing on an inline box). A `LinkButton` renders the button recipe's
 * styles after this one's, so it keeps the button's `inline-flex`.
 */
export const linkRecipe = defineRecipe({
  base: {
    display: 'inline',
    outline: 'none',
    borderRadius: 'md',
    transitionProperty: 'common',
    transitionDuration: 'fast',
    transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
    focusRing: 'none',
    _focusVisible: {
      boxShadow: 'outline',
    },
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
