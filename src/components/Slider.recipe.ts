import { defineSlotRecipe } from '@chakra-ui/react'

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
