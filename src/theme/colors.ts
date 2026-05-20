import { defineSemanticTokens, defineTokens } from '@chakra-ui/react'

// Mirrors the shape `defineSemanticTokens.colors({ primary: ... })` accepts at
// each top-level palette slot: a flat record of `{ value: <color-ref> }` token
// entries. `value` is `string | Record<string, string>` to allow conditional
// tokens (e.g. `{ base: '#fff', _dark: '#000' }`) in overrides without an
// `as`-cast, matching Chakra's `SemanticTokenDefinition` for the `colors`
// category. Intentionally one level deep — `definePalette` doesn't produce
// nested palettes, so consumers can't accidentally drift from the recipe shape.
type SemanticColorSlot = Record<string, { value: string | Record<string, string> }>

const aliasShades = (palette: string) =>
  Object.fromEntries(
    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => [
      shade,
      { value: `{colors.${palette}.${shade}}` },
    ]),
  )

// Builds the full semantic-token shape for a Chakra color palette: the `50..950`
// shade aliases plus the state slots (`contrast`, `fg`, `subtle`, `muted`,
// `emphasized`, `solid`, `border`, `focusRing`) that Chakra recipes draw from.
// Pass `overrides` to replace specific keys without re-spreading manually —
// e.g. a `color-mix`'d `50` shade for a tinted-surface background.
export const definePalette = (
  palette: string,
  overrides?: Partial<SemanticColorSlot>,
): SemanticColorSlot => ({
  ...aliasShades(palette),
  contrast: { value: '{colors.white}' },
  fg: { value: `{colors.${palette}.700}` },
  subtle: { value: `{colors.${palette}.50}` },
  muted: { value: `{colors.${palette}.100}` },
  emphasized: { value: `{colors.${palette}.300}` },
  solid: { value: `{colors.${palette}.500}` },
  border: { value: `{colors.${palette}.500}` },
  focusRing: { value: `{colors.${palette}.500}` },
  ...overrides,
})

export const colorTokens = defineTokens.colors({
  wood: {
    dark: { value: '#785e28' },
    light: { value: '#f5e1b3' },
  },
})

export const colorSemanticTokens = defineSemanticTokens.colors({
  primary: definePalette('pink'),
  accentA: definePalette('cyan'),
  accentB: definePalette('yellow'),
  outlineColor: { value: '{colors.cyan.600/50}' },
})
