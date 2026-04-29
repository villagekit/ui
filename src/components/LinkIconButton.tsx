'use client'

import { forwardRef } from 'react'
import { IconButton, type IconButtonProps } from './IconButton'
import { Link, type LinkProps } from './Link'

export interface LinkIconButtonProps extends Omit<IconButtonProps, 'asChild' | 'onClick'> {
  href?: LinkProps['href']
  isExternal?: boolean
}

export const LinkIconButton = forwardRef<HTMLButtonElement, LinkIconButtonProps>(
  function LinkIconButton(props, ref) {
    const { href, isExternal, children, icon, title, ...rest } = props

    return (
      <IconButton ref={ref} asChild title={title} {...rest}>
        <Link href={href} target={isExternal ? '_blank' : undefined}>
          {children ?? icon}
        </Link>
      </IconButton>
    )
  },
)
