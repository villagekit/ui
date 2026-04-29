'use client'

import {
  IconButton as BaseIconButton,
  type IconButtonProps as BaseIconButtonProps,
} from '@chakra-ui/react'
import { type ReactElement, forwardRef } from 'react'

export interface IconButtonProps extends Omit<BaseIconButtonProps, 'variant' | 'colorPalette'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'toolbar'
  /** v2 compat: pass icon as a prop. Prefer `children` going forward. */
  icon?: ReactElement
  title?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { icon, title, children, ...rest } = props

    return (
      <BaseIconButton
        ref={ref}
        aria-label={title ?? rest['aria-label'] ?? ''}
        title={title}
        borderRadius="full"
        {...(rest as BaseIconButtonProps)}
      >
        {children ?? icon}
      </BaseIconButton>
    )
  },
)
