import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * Chakra v2's table where Chakra v3's differs. The column header is set in the heading font, bold,
 * with `wider` letter spacing (v2's `th`, under the 0.9.0 theme's `textTransform: none` over v2's
 * `uppercase`); v3 sets it in the body font at `medium`. The `sm` size pads the header `1` by `4`
 * at `xs` on a 16px line (v2's `lineHeight: 4`, a token v3 has not, so written as `1rem`), the
 * cells `2` by `4` at `sm` on the same line and the caption `2` by `4` at `xs`, v2's `sm`; v3's
 * pads the header and the cells `2` all round. The `unstyled` variant is empty, as v2's was: no
 * rule under a row and no row background, where v3 has `line` and `outline` alone. `Table.Root`
 * widens its `variant` prop to name it.
 */
export const tableRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'footer', 'row', 'columnHeader', 'cell', 'caption'],
  base: {
    columnHeader: {
      fontFamily: 'heading',
      fontWeight: 'bold',
      letterSpacing: 'wider',
      textTransform: 'none',
    },
  },
  variants: {
    variant: {
      unstyled: {},
    },
    size: {
      sm: {
        columnHeader: { px: '4', py: '1', lineHeight: '1rem', fontSize: 'xs' },
        cell: { px: '4', py: '2', lineHeight: '1rem', fontSize: 'sm' },
        caption: { px: '4', py: '2', fontSize: 'xs' },
      },
    },
  },
})
