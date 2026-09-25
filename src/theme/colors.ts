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

// Chakra v2's palettes for the roles the theme reads and the two a site reads by name
// (`@chakra-ui/theme@3.3.1`, `src/foundations/colors.ts`), so `primary`, `accentA`,
// `accentB`, every `gray.*`, a `purple` badge and a `red` notice resolve to the values the
// 0.9.0 theme rendered; Chakra v3 ships a different default scale for each. v2 has no 950,
// which `definePalette` aliases, Chakra v3's semantic tokens and a `colorPalette` read: it
// is the 900 shade mixed halfway with black, so each scale stays one palette.
export const colorTokens = defineTokens.colors({
  gray: {
    50: { value: '#F7FAFC' },
    100: { value: '#EDF2F7' },
    200: { value: '#E2E8F0' },
    300: { value: '#CBD5E0' },
    400: { value: '#A0AEC0' },
    500: { value: '#718096' },
    600: { value: '#4A5568' },
    700: { value: '#2D3748' },
    800: { value: '#1A202C' },
    900: { value: '#171923' },
    950: { value: '#0C0D12' },
  },
  pink: {
    50: { value: '#FFF5F7' },
    100: { value: '#FED7E2' },
    200: { value: '#FBB6CE' },
    300: { value: '#F687B3' },
    400: { value: '#ED64A6' },
    500: { value: '#D53F8C' },
    600: { value: '#B83280' },
    700: { value: '#97266D' },
    800: { value: '#702459' },
    900: { value: '#521B41' },
    950: { value: '#290E21' },
  },
  cyan: {
    50: { value: '#EDFDFD' },
    100: { value: '#C4F1F9' },
    200: { value: '#9DECF9' },
    300: { value: '#76E4F7' },
    400: { value: '#0BC5EA' },
    500: { value: '#00B5D8' },
    600: { value: '#00A3C4' },
    700: { value: '#0987A0' },
    800: { value: '#086F83' },
    900: { value: '#065666' },
    950: { value: '#032B33' },
  },
  yellow: {
    50: { value: '#FFFFF0' },
    100: { value: '#FEFCBF' },
    200: { value: '#FAF089' },
    300: { value: '#F6E05E' },
    400: { value: '#ECC94B' },
    500: { value: '#D69E2E' },
    600: { value: '#B7791F' },
    700: { value: '#975A16' },
    800: { value: '#744210' },
    900: { value: '#5F370E' },
    950: { value: '#301C07' },
  },
  purple: {
    50: { value: '#FAF5FF' },
    100: { value: '#E9D8FD' },
    200: { value: '#D6BCFA' },
    300: { value: '#B794F4' },
    400: { value: '#9F7AEA' },
    500: { value: '#805AD5' },
    600: { value: '#6B46C1' },
    700: { value: '#553C9A' },
    800: { value: '#44337A' },
    900: { value: '#322659' },
    950: { value: '#19132D' },
  },
  red: {
    50: { value: '#FFF5F5' },
    100: { value: '#FED7D7' },
    200: { value: '#FEB2B2' },
    300: { value: '#FC8181' },
    400: { value: '#F56565' },
    500: { value: '#E53E3E' },
    600: { value: '#C53030' },
    700: { value: '#9B2C2C' },
    800: { value: '#822727' },
    900: { value: '#63171B' },
    950: { value: '#320C0E' },
  },
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
  // Chakra v2's body text (`chakra-body-text`), which headings and any text outside a
  // `Text` variant inherit; Chakra v3's `fg` is `black`.
  fg: { DEFAULT: { value: { _light: '{colors.gray.800}', _dark: '{colors.whiteAlpha.900}' } } },
})
