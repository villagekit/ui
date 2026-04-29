import { defineSlotRecipe } from '@chakra-ui/react'

export type { FieldLabelProps as FormLabelProps } from '@chakra-ui/react'
export { FieldLabel as FormLabel } from '@chakra-ui/react'

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
