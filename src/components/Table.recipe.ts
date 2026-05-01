import { defineSlotRecipe } from '@chakra-ui/react'

export const tableRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'footer', 'row', 'columnHeader', 'cell', 'caption'],
  base: {
    columnHeader: {
      textTransform: 'none',
    },
  },
})
