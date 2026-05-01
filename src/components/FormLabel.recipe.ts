import { defineSlotRecipe } from '@chakra-ui/react'

export const fieldRecipe = defineSlotRecipe({
  slots: [
    'root',
    'label',
    'input',
    'select',
    'textarea',
    'helperText',
    'errorText',
    'requiredIndicator',
  ],
  base: {
    label: {
      fontWeight: 'normal',
    },
  },
})
