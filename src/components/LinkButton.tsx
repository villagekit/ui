'use client'

import { forwardRef } from 'react'
import { Button, type ButtonProps } from './Button'
import { Link, type LinkProps } from './Link'

export interface LinkButtonProps extends Omit<ButtonProps, 'asChild'> {
  href?: LinkProps['href']
  isExternal?: boolean
}

export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  function LinkButton(props, ref) {
    const { href, isExternal, children, ...rest } = props

    return (
      <Button ref={ref} asChild {...rest}>
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {children}
        </Link>
      </Button>
    )
  },
)
