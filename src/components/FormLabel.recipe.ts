import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The field label at Chakra v2's `FormLabel` size: `fontSize: md` (16px) with no line height of
 * its own, so it sits on the body's line (24px), as the 0.9.0 theme rendered it, at the 0.9.0
 * theme's `normal` weight. Chakra v3's field recipe gives the label `textStyle: sm` (14px on a
 * 20px line) at `medium`; `textStyle: 'none'` replaces that key with an empty style, so the font
 * size here holds and the line height falls to the body's.
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
    label: {
      fontWeight: 'normal',
      textStyle: 'none',
      fontSize: 'md',
    },
  },
})
