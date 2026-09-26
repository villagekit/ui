import { defineRecipe } from '@chakra-ui/react'

/**
 * Chakra v2's container (`@chakra-ui/theme` `components/container`): full width, centered, capped
 * at `prose` and padded `4` at every width, with no position rule. Chakra v3's recipe caps it at
 * `8xl`, pads `4`, `6` and `8` up the breakpoints and positions it `relative`; registered under
 * the `container` key, this base replaces those declarations and leaves v3's `centerContent` and
 * `fluid` variants as they are.
 */
export const containerRecipe = defineRecipe({
  base: {
    position: 'static',
    w: '100%',
    mx: 'auto',
    maxWidth: 'prose',
    px: '4',
  },
})
