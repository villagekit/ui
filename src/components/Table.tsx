import {
  Table as BaseTable,
  type TableRootProps as BaseTableRootProps,
  type ConditionalValue,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export type {
  TableBodyProps,
  TableHeaderProps,
  TableRowProps,
  TableCellProps,
  TableColumnHeaderProps,
  TableCaptionProps,
  TableFooterProps,
} from '@chakra-ui/react'

/**
 * Chakra v3's table root props with `variant` widened to the `unstyled` variant the package's
 * table recipe adds (`tableRecipe`): Chakra's generated type names its own two variants alone,
 * and a recipe cannot widen it.
 */
export interface TableRootProps extends Omit<BaseTableRootProps, 'variant'> {
  variant?: ConditionalValue<'line' | 'outline' | 'unstyled'>
}

export type TableProps = TableRootProps

/**
 * Chakra v3's `Table.Root` taking the widened variant; the recipe resolves `unstyled` at runtime,
 * so the cast narrows the type alone.
 */
const Root = forwardRef<HTMLTableElement, TableRootProps>(function TableRoot(props, ref) {
  return <BaseTable.Root ref={ref} {...(props as BaseTableRootProps)} />
})

/**
 * Chakra v3's table namespace with `Root` swapped for the one above. Built as an object in a
 * shared module, not a `'use client'` one: a server component reads the members by property
 * (`Table.Root`), which Next refuses on a client module's export. The annotation keeps the
 * emitted type portable; the inferred one names Chakra's internal paths.
 */
export const Table: Omit<typeof BaseTable, 'Root'> & { Root: typeof Root } = {
  ...BaseTable,
  Root,
}
