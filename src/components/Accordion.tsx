import { type AccordionItemIndicatorProps, Accordion as BaseAccordion } from '@chakra-ui/react'
import { forwardRef } from 'react'

export type {
  AccordionItemContentProps,
  AccordionItemIndicatorProps,
  AccordionItemProps,
  AccordionItemTriggerProps,
  AccordionRootProps,
} from '@chakra-ui/react'

/**
 * Chakra v2's `AccordionIcon` glyph, the 0.9.0 accordion's: a filled chevron on the 24-unit
 * viewBox in the indicator's color, hidden from assistive technology and unfocusable as v2's
 * `Icon` rendered it. Chakra v3's default child is a 2px stroked chevron with no fill. The path
 * is ported from https://github.com/chakra-ui/chakra-ui/blob/d911122/packages/components/accordion/src/accordion-icon.tsx
 */
// Note(cc): v2's AccordionIcon also dimmed to 0.4 opacity on a disabled item and dropped the
// rotation transition under the accordion's reduceMotion; no consumer uses either.
const chevron = (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
)

/**
 * Chakra v3's `Accordion.ItemIndicator` with the 0.9.0 glyph as its default child; a child passed
 * in replaces it, the way Chakra's own default child does. The indicator's size and color are the
 * accordion recipe's (`accordionRecipe`), its rotation when open Chakra v3's.
 */
const AccordionItemIndicator = forwardRef<HTMLDivElement, AccordionItemIndicatorProps>(
  function AccordionItemIndicator(props, ref) {
    const { children = chevron, ...rest } = props
    return (
      <BaseAccordion.ItemIndicator ref={ref} {...rest}>
        {children}
      </BaseAccordion.ItemIndicator>
    )
  },
)

/**
 * Chakra v3's accordion namespace with `ItemIndicator` swapped for the one above. Built as an
 * object in a shared module, not a `'use client'` one: a server component reads the members by
 * property (`Accordion.Root`), which Next refuses on a client module's export. The annotation
 * keeps the emitted type portable; the inferred one names Ark's package path.
 */
export const Accordion: Omit<typeof BaseAccordion, 'ItemIndicator'> & {
  ItemIndicator: typeof AccordionItemIndicator
} = {
  Root: BaseAccordion.Root,
  RootProvider: BaseAccordion.RootProvider,
  PropsProvider: BaseAccordion.PropsProvider,
  Item: BaseAccordion.Item,
  ItemTrigger: BaseAccordion.ItemTrigger,
  ItemIndicator: AccordionItemIndicator,
  ItemContent: BaseAccordion.ItemContent,
  ItemBody: BaseAccordion.ItemBody,
  Context: BaseAccordion.Context,
  ItemContext: BaseAccordion.ItemContext,
}
