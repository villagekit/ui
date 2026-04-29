'use client'

import { useChakraContext } from '@chakra-ui/react'
import type { Theme } from '../theme'

/**
 * Returns the resolved Chakra system. Use `system.token('colors.primary.500')` and similar
 * accessors rather than indexing into `theme.colors.x.y` like in v2.
 */
export const useTheme = (): Theme => useChakraContext() as Theme
