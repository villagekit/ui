import { defineRecipe } from '@chakra-ui/react'

/**
 * Chakra v2's badge (`@chakra-ui/theme` `components/badge`: `px: 1`, `fontSize: xs`,
 * `fontWeight: bold`, laid out `inline-block` at `vertical-align: middle` by the v2 `Badge`
 * component itself) under the 0.9.0 theme's `borderRadius: lg` and `textTransform: none`. Chakra
 * v3's recipe lays the badge out `inline-flex` and its default `size: sm` writes `textStyle: xs`,
 * `px: 1.5` and `minH: 5` over the base, so v2's `px: 1` lives in that size, beside no text style
 * and no minimum height; the other v3 sizes stay reachable by name. v3's `whiteSpace: nowrap`
 * (v2's component wrote it too) stays. v3's `userSelect: none` and `fontVariantNumeric:
 * tabular-nums`, which v2 never wrote, are reset to their initial values here, since the theme
 * merge keeps every v3 declaration the recipe does not override: a badge's text is selectable and
 * its digits proportional, as under v2.
 */
export const badgeRecipe = defineRecipe({
  base: {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: 'xs',
    fontWeight: 'bold',
    borderRadius: 'lg',
    textTransform: 'none',
    userSelect: 'auto',
    fontVariantNumeric: 'normal',
  },
  variants: {
    size: {
      sm: { textStyle: 'none', px: '1', minH: 'auto' },
    },
  },
})
