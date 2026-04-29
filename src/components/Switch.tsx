import { Switch, defineSlotRecipe } from '@chakra-ui/react'

export type {
  SwitchRootProps as SwitchProps,
  SwitchControlProps,
  SwitchLabelProps,
  SwitchThumbProps,
} from '@chakra-ui/react'
export { Switch }

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
