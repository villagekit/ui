import { defineSemanticTokens, defineTokens } from '@chakra-ui/react'

const aliasShades = (palette: string) =>
  Object.fromEntries(
    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'].map((shade) => [
      shade,
      { value: `{colors.${palette}.${shade}}` },
    ]),
  )

const paletteTokens = (palette: string) => ({
  ...aliasShades(palette),
  contrast: { value: '{colors.white}' },
  fg: { value: `{colors.${palette}.700}` },
  subtle: { value: `{colors.${palette}.50}` },
  muted: { value: `{colors.${palette}.100}` },
  emphasized: { value: `{colors.${palette}.300}` },
  solid: { value: `{colors.${palette}.500}` },
  border: { value: `{colors.${palette}.500}` },
  focusRing: { value: `{colors.${palette}.500}` },
})

export const colorTokens = defineTokens.colors({
  wood: {
    dark: { value: '#785e28' },
    light: { value: '#f5e1b3' },
  },
})

export const colorSemanticTokens = defineSemanticTokens.colors({
  primary: paletteTokens('pink'),
  accentA: paletteTokens('cyan'),
  accentB: paletteTokens('yellow'),
  outlineColor: { value: '{colors.cyan.600/50}' },
})
