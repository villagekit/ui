import { defineSlotRecipe } from '@chakra-ui/react'

/**
 * The field as Chakra v2's `FormControl`: a block root whose label is a block across its column,
 * so a click beside the label's text still reaches the control it names, and whose control sits in
 * a line box on the field's line, where an inline-level control (a switch, a slider) takes the
 * line's height and alignment as it did under v2. Chakra v3's field root is a flex column with
 * `alignItems: flex-start` and its label `display: flex`, which shrinks the label to its text and
 * stacks the control with no line box; the block display is written on the `vertical` orientation,
 * the default, so v3's `horizontal` row keeps its flex layout. The label is at Chakra v2's
 * `FormLabel` size: `fontSize: md` (16px) with no line height of its own, so it sits on the body's
 * line (24px), as the 0.9.0 theme rendered it, at the 0.9.0 theme's `normal` weight. Chakra v3's
 * field recipe gives the label `textStyle: sm` (14px on a 20px line) at `medium`; `textStyle:
 * 'none'` replaces that key with an empty style, so the font size here holds and the line height
 * falls to the body's. The label carries v2's margins, 12px at its end and 8px below, on a root
 * with no gap, where Chakra v3's root spaces its slots 6px apart and the label has no margin; it
 * fades its colors over the `common` properties at 200ms, v2's `normal` duration; and it dims to
 * v2's `0.4` when the field is disabled, where v3 dims it to `0.5`. With no gap, the helper and
 * error text carry v2's 8px top margin, the helper text a block and the error text a flex row as
 * v2's were, since a block root no longer lays them out as flex items; with a block label, the
 * required indicator carries v2's `marginStart: 1` in place of v3's label gap.
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
      display: 'block',
      fontWeight: 'normal',
      textStyle: 'none',
      fontSize: 'md',
      marginEnd: '3',
      mb: '2',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      opacity: '1',
      _disabled: {
        opacity: '0.4',
      },
    },
    helperText: {
      display: 'block',
      mt: '2',
    },
    errorText: {
      display: 'flex',
      mt: '2',
    },
    requiredIndicator: {
      marginStart: '1',
    },
  },
  variants: {
    orientation: {
      vertical: {
        root: {
          display: 'block',
        },
      },
    },
  },
})
