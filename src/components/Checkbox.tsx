import { Checkbox, defineSlotRecipe } from '@chakra-ui/react'

export type {
  CheckboxRootProps as CheckboxProps,
  CheckboxControlProps,
  CheckboxLabelProps,
  CheckboxIndicatorProps,
} from '@chakra-ui/react'
export { Checkbox }

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
