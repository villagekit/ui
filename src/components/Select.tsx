import { NativeSelect, type NativeSelectIndicatorProps, defineSlotRecipe } from '@chakra-ui/react'
import { inputSize } from './Input'

export type {
  NativeSelectRootProps as SelectProps,
  NativeSelectFieldProps,
  NativeSelectIndicatorProps,
} from '@chakra-ui/react'

/**
 * Chakra v2's `Select` glyph, the 0.9.0 select's: a filled chevron on the 24-unit viewBox in the
 * indicator's color, presentational, hidden from assistive technology and unfocusable as v2's
 * `SelectIcon` rendered it. Chakra v3's default child is a 2px stroked chevron with no fill. The
 * path is ported from https://github.com/chakra-ui/chakra-ui/blob/4e2df65/packages/components/select/src/select.tsx
 */
const chevron = (
  <svg viewBox="0 0 24 24" role="presentation" focusable="false" aria-hidden="true">
    <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
  </svg>
)

/**
 * Chakra v3's `NativeSelect.Indicator` with the 0.9.0 glyph as its default child; a child passed
 * in replaces it, the way Chakra's own default child does. The indicator's box, glyph size and
 * color are the native select recipe's (`nativeSelectRecipe`).
 */
// Note(cc): v2's SelectIcon also cloned the three attributes and a 1em size onto a child the
// caller passed; a child passed here renders as given. No consumer passes one.
function SelectIndicator(props: NativeSelectIndicatorProps) {
  const { children = chevron, ...rest } = props
  return <NativeSelect.Indicator {...rest}>{children}</NativeSelect.Indicator>
}

/**
 * Chakra v3's native select namespace with `Indicator` swapped for the one above. Built as an
 * object in a shared module, not a `'use client'` one: a server component reads the members by
 * property (`Select.Root`), which Next refuses on a client module's export. The annotation keeps
 * the emitted type portable; the inferred one names Ark's package path.
 */
export const Select: Omit<typeof NativeSelect, 'Indicator'> & {
  Indicator: typeof SelectIndicator
} = {
  Root: NativeSelect.Root,
  PropsProvider: NativeSelect.PropsProvider,
  Field: NativeSelect.Field,
  Indicator: SelectIndicator,
}

/**
 * The native select on Chakra v2's input sizes and focus (see `inputRecipe`): the field's height,
 * font size, padding and radius per size, the room for the chevron kept, and the focused field
 * bordered in the theme's `outlineColor` with no outline over it. The field carries v2's input
 * base too: its colors and shadow fade over the `common` properties at v2's `normal` duration
 * (v3's `moderate`, 200ms), and its text sits on v2's one-pixel bottom padding. The `outline`
 * field, the default variant, is white, the background the 0.9.0 `Select` wrapper passed, in
 * place of Chakra v3's transparent one; the white sits in the variant because the recipe merges
 * the chosen variant over the base, so a base `bg` would lose to v3's `transparent`, and a
 * caller's own `bg` prop still wins over it. The same variant darkens the border to `gray.300`
 * under the pointer, as v2's outline input did, so the other variants keep no hover border. The
 * indicator is v2's icon wrapper: 24px wide, in the field's own color, its glyph 1em of `xl`
 * (20px) at the four sizes written here, where v3 sized it by a text style per size and colored
 * it `fg.muted`; the four size variants blank v3's text style so the base font size holds.
 */
// Note(cc): Chakra v3's `xl` size, which v2 had not, keeps v3's field and indicator readings.
export const nativeSelectRecipe = defineSlotRecipe({
  className: 'chakra-native-select',
  slots: ['root', 'field', 'indicator'],
  base: {
    field: {
      pb: '1px',
      transitionProperty: 'common',
      transitionDuration: 'moderate',
      '--focus-color': 'colors.outlineColor',
      focusVisibleRing: 'none',
      _focusVisible: {
        borderColor: 'var(--focus-color)',
        boxShadow: '0 0 0 1px var(--focus-color)',
      },
    },
    indicator: {
      width: '6',
      color: 'currentColor',
      fontSize: 'xl',
    },
  },
  variants: {
    variant: {
      outline: {
        field: {
          bg: 'white',
          _hover: { borderColor: 'gray.300' },
        },
      },
    },
    size: {
      xs: selectSize('xs', '2', 'xs', 'sizes.6', '1'),
      sm: selectSize('sm', '3', 'xs', 'sizes.8', '2'),
      md: selectSize('md', '4', 'md', 'sizes.10', '2'),
      lg: selectSize('lg', '4', 'md', 'sizes.12', '2'),
    },
  },
})

function selectSize(
  fontSize: string,
  paddingX: string,
  borderRadius: string,
  height: string,
  indicatorInset: string,
) {
  const { px, ...text } = inputSize(fontSize, paddingX, borderRadius)
  return {
    root: { '--select-field-height': height },
    field: { ...text, ps: px, pe: '8' },
    indicator: { textStyle: 'none', insetEnd: indicatorInset },
  }
}
