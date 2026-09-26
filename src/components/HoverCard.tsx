'use client'

import { Box, type BoxProps } from '@chakra-ui/react'
import { type ReactNode, forwardRef } from 'react'

const focusStyle = {
  borderColor: 'outlineColor',
} as const

const hoverStyle = {
  backgroundColor: 'accentB.100',
  borderColor: 'accentB.300',
} as const

const containerHoverStyle = {
  cursor: 'pointer',
  transform: 'scale(1.05)',
} as const

export interface HoverCardProps extends BoxProps {
  isHoverable?: boolean
  children: ReactNode
}

export const HoverCard = forwardRef<HTMLDivElement, HoverCardProps>(function HoverCard(props, ref) {
  const { isHoverable = true, css, children, ...rest } = props

  return (
    <Box
      ref={ref}
      className="ui-hover-card"
      css={[
        {
          backgroundColor: 'gray.50',
          borderColor: 'gray.200',
          borderRadius: 'xl',
          borderStyle: 'dashed',
          borderWidth: '2px',
          overflow: 'hidden',
          transitionDuration: 'fast',
          ...(isHoverable
            ? {
                _focusWithin: focusStyle,
                _hover: {
                  ...containerHoverStyle,
                  ...hoverStyle,
                },
              }
            : {}),
        },
        css,
      ]}
      {...rest}
    >
      {children}
    </Box>
  )
})

export interface HoverCardContainerProps extends BoxProps {
  children: ReactNode
}

export const HoverCardContainer = forwardRef<HTMLDivElement, HoverCardContainerProps>(
  function HoverCardContainer(props, ref) {
    const { css, children, ...rest } = props

    return (
      <Box
        ref={ref}
        css={[
          {
            transitionDuration: 'fast',
            // Chakra v3's `css` reads a key as a selector only when it holds `&`, starts
            // with `@` or `_`, or names a condition; a bare `.ui-hover-card` is flattened
            // into a property, which styles nothing and logs a kebab-case error in
            // development.
            _focusWithin: {
              '& .ui-hover-card': focusStyle,
            },
            _hover: {
              '& .ui-hover-card': hoverStyle,
              ...containerHoverStyle,
            },
          },
          css,
        ]}
        {...rest}
      >
        {children}
      </Box>
    )
  },
)
