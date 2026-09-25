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
 * bordered in the theme's `outlineColor` with no outline over it.
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
