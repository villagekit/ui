import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The field label at Chakra v2's `FormLabel` size: `fontSize: md` (16px) with no line height of
 * its own, so it sits on the body's line (24px), as the 0.9.0 theme rendered it, at the 0.9.0
 * theme's `normal` weight. Chakra v3's field recipe gives the label `textStyle: sm` (14px on a
 * 20px line) at `medium`; `textStyle: 'none'` replaces that key with an empty style, so the font
 * size here holds and the line height falls to the body's. The label carries v2's margins, 12px at
 * its end and 8px below, on a root with no gap, where Chakra v3's root spaces its slots 6px apart
 * and the label has no margin; and it fades its colors over the `common` properties at 200ms, v2's
 * `normal` duration. With no gap, the helper and error text carry v2's 8px top margin.
 */
export const fieldRecipe = defineSlotRecipe({
  slots: [
    'root',
    'label',
    'input',
    'select',
    'textarea',
    'helperText',
    'errorText',
    'requiredIndicator',
  ],
  base: {
    root: {
      gap: '0',
    },
    label: {
      fontWeight: 'normal',
      textStyle: 'none',
      fontSize: 'md',
      marginEnd: '3',
      mb: '2',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
    },
    helperText: {
      mt: '2',
    },
    errorText: {
      mt: '2',
    },
  },
})
