'use client'

import { forwardRef } from 'react'
import { Button, type ButtonProps } from './Button'
import { Link, type LinkProps } from './Link'

export interface LinkButtonProps extends Omit<ButtonProps, 'asChild' | 'as'> {
  href?: LinkProps['href']
  isExternal?: boolean
  /** Render the anchor as another component — e.g. `as={NextLink}` for client-side routing. */
  as?: LinkProps['as']
}

// Note(cc): the rendered element is an anchor, so `ref` is really an HTMLAnchorElement, and the
// inherited `disabled` / `loading` props do nothing (Chakra skips the loader under `asChild`, and
// `disabled` is meaningless on `<a>`). Both are breaking type changes — fix in a major.
export const LinkButton = forwardRef<HTMLButtonElement, LinkButtonProps>(
  function LinkButton(props, ref) {
    const { as, href, isExternal, children, ...rest } = props

    // `as` has to land on the inner Link: Button consumes it while resolving `asChild`.
    // `type` is Button's hardcoded default — a MIME hint, and wrong, on an anchor.
    return (
      <Button ref={ref} asChild type={undefined} {...rest}>
        <Link
          as={as}
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
