import { NativeSelect, defineSlotRecipe } from '@chakra-ui/react'
import { inputSize } from './Input'

export type {
  NativeSelectRootProps as SelectProps,
  NativeSelectFieldProps,
} from '@chakra-ui/react'

export const Select = NativeSelect

/**
 * The native select on Chakra v2's input sizes and focus (see `inputRecipe`): the field's height,
 * font size, padding and radius per size, the room for the chevron kept, and the focused field
 * bordered in the theme's `outlineColor` with no outline over it. The `outline` field, the
 * default variant, is white, the background the 0.9.0 `Select` wrapper passed, in place of
 * Chakra v3's transparent one; the white sits in the variant and not the base because the recipe
 * merges the chosen variant over the base, so a base `bg` would lose to v3's `transparent`. A
 * caller's own `bg` prop still wins over it.
 */
export const nativeSelectRecipe = defineSlotRecipe({
  className: 'chakra-native-select',
  slots: ['root', 'field', 'indicator'],
  base: {
    field: {
      '--focus-color': 'colors.outlineColor',
      focusVisibleRing: 'none',
      _focusVisible: {
        borderColor: 'var(--focus-color)',
        boxShadow: '0 0 0 1px var(--focus-color)',
      },
    },
  },
  variants: {
    variant: {
      outline: {
        field: { bg: 'white' },
      },
    },
    size: {
      xs: selectSize('xs', '2', 'xs', 'sizes.6'),
      sm: selectSize('sm', '3', 'xs', 'sizes.8'),
      md: selectSize('md', '4', 'md', 'sizes.10'),
      lg: selectSize('lg', '4', 'md', 'sizes.12'),
    },
  },
})

function selectSize(fontSize: string, paddingX: string, borderRadius: string, height: string) {
  const { px, ...text } = inputSize(fontSize, paddingX, borderRadius)
  return {
    root: { '--select-field-height': height },
    field: { ...text, ps: px, pe: '8' },
  }
}
