import { defineSlotRecipe } from '@chakra-ui/react'

export const accordionRecipe = defineSlotRecipe({
  slots: ['root', 'item', 'itemTrigger', 'itemContent', 'itemBody', 'itemIndicator'],
  base: {
    item: {
      borderStyle: 'dashed',
      borderTopWidth: '2px',
      '&:last-of-type': {
        borderBottomWidth: '2px',
      },
    },
    itemTrigger: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingX: '2',
      paddingY: '4',
    },
    itemContent: {
      paddingX: '4',
      paddingY: '4',
    },
  },
})
