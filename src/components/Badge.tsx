import { defineRecipe } from '@chakra-ui/react'

export type { BadgeProps } from '@chakra-ui/react'
export { Badge } from '@chakra-ui/react'

export const badgeRecipe = defineRecipe({
  base: {
    borderRadius: 'lg',
    textTransform: 'none',
  },
})
