'use client'

import { defineRecipe, useRecipe } from '@chakra-ui/react'
import { type KeyboardEvent, forwardRef } from 'react'

import { Link, type LinkProps } from './Link'

export interface NavLinkProps extends Omit<LinkProps, 'variant'> {
  isSelected?: boolean
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'heading' | 'text'
  onKeyDown?: (ev: KeyboardEvent) => void
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(props, ref) {
  const { size, variant, isSelected, css, ...rest } = props

  const recipe = useRecipe({ recipe: navLinkRecipe })
  const styles = recipe({ size, variant })

  return (
    <Link
      ref={ref}
      variant="secondary"
      css={[
        styles,
        {
          position: 'relative',
          ...(isSelected
            ? {
                '&::after': {
                  borderBottomWidth: '2px',
                  borderColor: 'primary.500',
                  borderStyle: 'dashed',
                  bottom: 0,
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  width: '100%',
                },
              }
            : {}),
        },
        css,
      ]}
      {...rest}
    />
  )
})

export const navLinkRecipe = defineRecipe({
  variants: {
    size: {
      xl: { fontSize: '3xl' },
      lg: { fontSize: '2xl' },
      md: { fontSize: 'xl' },
      sm: { fontSize: 'lg' },
      xs: { fontSize: 'md' },
    },
    variant: {
      text: { fontFamily: 'body' },
      heading: { fontFamily: 'heading' },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'heading',
  },
})
