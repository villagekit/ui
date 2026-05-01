import { defineSlotRecipe } from '@chakra-ui/react'

export const checkboxRecipe = defineSlotRecipe({
  slots: ['root', 'control', 'label', 'indicator'],
  base: {
    control: {
      _checked: {
        backgroundColor: 'primary.300',
        borderColor: 'primary.300',
        _hover: {
          backgroundColor: 'primary.300',
          borderColor: 'primary.300',
        },
      },
    },
    indicator: {
      background: 'primary.300',
    },
  },
})
