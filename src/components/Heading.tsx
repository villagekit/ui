'use client'

import {
  Heading as BaseHeading,
  type HeadingProps as BaseHeadingProps,
  defineRecipe,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface HeadingProps extends BaseHeadingProps {}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(props, ref) {
  return <BaseHeading ref={ref} {...props} />
})

export const headingRecipe = defineRecipe({
  base: {
    fontFamily: 'heading',
    fontWeight: 'normal',
  },
})
