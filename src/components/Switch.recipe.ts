import { defineSlotRecipe } from '@chakra-ui/react'

export const switchRecipe = defineSlotRecipe({
  slots: ['root', 'label', 'control', 'thumb', 'indicator'],
  base: {
    control: {
      _checked: {
        background: 'primary.300',
      },
    },
  },
})
