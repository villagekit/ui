import { Slider, defineSlotRecipe } from '@chakra-ui/react'

export type {
  SliderRootProps as SliderProps,
  SliderTrackProps,
  SliderThumbProps,
} from '@chakra-ui/react'
export { Slider }

export const sliderRecipe = defineSlotRecipe({
  slots: [
    'root',
    'label',
    'control',
    'track',
    'range',
    'thumb',
    'valueText',
    'marker',
    'markerGroup',
    'markerIndicator',
  ],
  base: {
    range: {
      background: 'primary.300',
    },
  },
})
