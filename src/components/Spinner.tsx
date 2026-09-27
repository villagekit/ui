'use client'

import {
  Spinner as BaseSpinner,
  type SpinnerProps as BaseSpinnerProps,
  VisuallyHidden,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface SpinnerProps extends Omit<BaseSpinnerProps, 'colorPalette'> {
  colorScheme?: 'primary' | 'accentA'
  /**
   * The text assistive technology reads for the spinner, rendered visually hidden inside it,
   * as Chakra v2's Spinner rendered its `label`. Defaults to `Loading...`, v2's default; an
   * empty string renders no label.
   */
  label?: string
}

/**
 * A loading indicator that renders its `label` visually hidden inside the spinning element,
 * as Chakra v2's Spinner did under 0.9.0 (an `srOnly` span); Chakra v3's Spinner is a bare
 * span with no label. A caller's `children` is replaced by the label, as v2 replaced it.
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(props, ref) {
  const { colorScheme = 'accentA', label = 'Loading...', ...rest } = props

  return (
    <BaseSpinner
      ref={ref}
      color={`${colorScheme}.400`}
      css={{ '--spinner-track-color': 'colors.gray.200' }}
      {...rest}
    >
      {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
    </BaseSpinner>
  )
})
