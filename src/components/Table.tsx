import { Table, defineSlotRecipe } from '@chakra-ui/react'

export type {
  TableRootProps as TableProps,
  TableBodyProps,
  TableHeaderProps,
  TableRowProps,
  TableCellProps,
  TableColumnHeaderProps,
  TableCaptionProps,
  TableFooterProps,
} from '@chakra-ui/react'
export { Table }

export const tableRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'footer', 'row', 'columnHeader', 'cell', 'caption'],
  base: {
    columnHeader: {
      textTransform: 'none',
    },
  },
})
