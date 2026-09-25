import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The 0.9.0 accordion under Chakra v2: a 2px dashed rule above every item and below the last one
 * and no other border (v3's default `outline` variant would add a 1px bottom rule to each item),
 * square triggers padded 4 by 2, at the surrounding weight, that fill `blackAlpha.50` on hover
 * with the `common` transition and show the theme's `outline` shadow on keyboard focus, and panels
 * padded 4. The trigger's vertical padding is v3's `--accordion-padding-y`, which its size variant
 * reads; its focus outline is written directly, since v3's recipe writes the trigger's outline
 * itself rather than through the ring utility.
 */
export const accordionRecipe = defineSlotRecipe({
  slots: ['root', 'item', 'itemTrigger', 'itemContent', 'itemBody', 'itemIndicator'],
  base: {
    root: {
      '--accordion-radius': '0',
    },
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
      fontWeight: 'inherit',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      _hover: {
        bg: 'blackAlpha.50',
      },
      _focusVisible: {
        outline: 'none',
        boxShadow: 'outline',
      },
    },
    itemBody: {
      paddingX: '4',
      pt: '4',
      pb: '4',
    },
  },
  variants: {
    size: {
      md: {
        root: {
          '--accordion-padding-y': 'spacing.4',
        },
      },
    },
    variant: {
      plain: {},
    },
  },
  defaultVariants: {
    variant: 'plain',
  },
})
