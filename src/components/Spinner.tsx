'use client'

import { Spinner as BaseSpinner, type SpinnerProps as BaseSpinnerProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface SpinnerProps extends Omit<BaseSpinnerProps, 'colorPalette'> {
  colorScheme?: 'primary' | 'accentA'
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(props, ref) {
  const { colorScheme = 'accentA', ...rest } = props

  return (
    <BaseSpinner
      ref={ref}
      color={`${colorScheme}.400`}
      css={{ '--spinner-track-color': 'colors.gray.200' }}
      {...rest}
    />
  )
})
