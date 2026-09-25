'use client'

import { forwardRef } from 'react'
import { IconButton, type IconButtonProps } from './IconButton'
import { Link, type LinkProps } from './Link'

export interface LinkIconButtonProps extends Omit<IconButtonProps, 'asChild' | 'as' | 'onClick'> {
  href?: LinkProps['href']
  /** Open the link in a new tab with `rel="noopener"`, what Chakra v2's `Link` rendered for the 0.9.0 button's `isExternal`. */
  isExternal?: boolean
  /** Render the anchor as another component — e.g. `as={NextLink}` for client-side routing. */
  as?: LinkProps['as']
}

export const LinkIconButton = forwardRef<HTMLButtonElement, LinkIconButtonProps>(
  function LinkIconButton(props, ref) {
    const { as, href, isExternal, children, icon, title, ...rest } = props

    // `as` has to land on the inner Link: IconButton consumes it while resolving `asChild`.
    // `type` is the button default — a MIME hint, and wrong, on an anchor.
    return (
      <IconButton ref={ref} asChild title={title} type={undefined} {...rest}>
        <Link as={as} href={href} isExternal={isExternal}>
          {children ?? icon}
        </Link>
      </IconButton>
    )
  },
)
