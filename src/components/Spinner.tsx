'use client'

import {
  Spinner as BaseSpinner,
  type SpinnerProps as BaseSpinnerProps,
  VisuallyHidden,
  defineRecipe,
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

/**
 * The 0.9.0 spinner on Chakra v2's spinner theme and component: `md` is 24px (`sizes.6`) and
 * `xl` 48px (`sizes.12`), where Chakra v3's recipe has 20px (`sizes.5`) and 40px (`sizes.10`);
 * `xs`, `sm` and `lg` are the same on both and stay v3's. One turn takes `0.45s`, Chakra v2's
 * default `speed`, written as a literal because Chakra v3's durations tokens hold no 450ms
 * value; v3's recipe turns on the `slowest` token, 500ms. `createSystem` deep-merges this
 * recipe over v3's, so the rest of the base and the other sizes are v3's.
 */
export const spinnerRecipe = defineRecipe({
  base: {
    animationDuration: '0.45s',
  },
  variants: {
    size: {
      md: { '--spinner-size': 'sizes.6' },
      xl: { '--spinner-size': 'sizes.12' },
    },
  },
})
