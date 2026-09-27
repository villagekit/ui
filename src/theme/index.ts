import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineSemanticTokens,
  defineTokens,
} from '@chakra-ui/react'

import { accordionRecipe } from '../components/Accordion.recipe'
import { badgeRecipe } from '../components/Badge.recipe'
import { buttonRecipe } from '../components/Button'
import { checkboxRecipe } from '../components/Checkbox.recipe'
import { containerRecipe } from '../components/Container.recipe'
import { fieldRecipe } from '../components/FormLabel.recipe'
import { headingRecipe } from '../components/Heading'
import { inputRecipe } from '../components/Input'
import { linkRecipe } from '../components/Link'
import { navLinkRecipe } from '../components/NavLink'
import { numberInputRecipe } from '../components/NumberInput'
import { nativeSelectRecipe } from '../components/Select'
import { sliderRecipe } from '../components/Slider.recipe'
import { spinnerRecipe } from '../components/Spinner'
import { switchRecipe } from '../components/Switch.recipe'
import { tableRecipe } from '../components/Table.recipe'
import { tabsRecipe } from '../components/Tabs'
import { textRecipe } from '../components/Text'
import { colorSemanticTokens, colorTokens } from './colors'

export { definePalette } from './colors'

const systemFontFallback =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

// The app loads the web fonts itself and either writes their families into these tokens when it
// creates its own system or sets `--font-body` and `--font-heading` on `html`; with neither, the
// bare family names apply.
const fonts = defineTokens.fonts({
  body: { value: `var(--font-body, Bitter), ${systemFontFallback}` },
  heading: { value: `var(--font-heading, Fredoka), ${systemFontFallback}` },
})

// Chakra v2's shadow scale (`@chakra-ui/theme@3.3.1`, `src/foundations/shadows.ts`), the
// values the 0.9.0 theme rendered for `boxShadow="sm"` and the rest. Chakra v3 defines the
// same names, `base` aside, as semantic tokens with two gray layers, so those are replaced at
// that level; `base` is a token, since a semantic token named `base` reads as a condition.
const shadows = defineTokens.shadows({
  base: { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
  outline: { value: '0 0 0 2px {colors.outlineColor}' },
  outlineLarge: { value: '0 0 0 4px {colors.outlineColor}' },
})

const shadowSemanticTokens = defineSemanticTokens.shadows({
  xs: { value: '0 0 0 1px rgba(0, 0, 0, 0.05)' },
  sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  md: { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
  lg: { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  xl: { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' },
  '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  inner: { value: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)' },
})

export const config = defineConfig({
  globalCss: {
    // Chakra v3's CSS reset uses `--global-font-body` for the document font.
    // Point that at our Bitter token so body copy actually picks up the
    // configured face instead of falling through to system sans-serif.
    html: {
      '--global-font-body': '{fonts.body}',
    },
  },
  theme: {
    tokens: {
      colors: colorTokens,
      fonts,
      shadows,
    },
    semanticTokens: {
      colors: colorSemanticTokens,
      shadows: shadowSemanticTokens,
    },
    recipes: {
      badge: badgeRecipe,
      button: buttonRecipe,
      container: containerRecipe,
      heading: headingRecipe,
      input: inputRecipe,
      link: linkRecipe,
      navLink: navLinkRecipe,
      spinner: spinnerRecipe,
      text: textRecipe,
    },
    slotRecipes: {
      accordion: accordionRecipe,
      checkbox: checkboxRecipe,
      field: fieldRecipe,
      nativeSelect: nativeSelectRecipe,
      numberInput: numberInputRecipe,
      slider: sliderRecipe,
      switch: switchRecipe,
      table: tableRecipe,
      tabs: tabsRecipe,
    },
  },
})

export const system = createSystem(defaultConfig, config)

export const theme = system

export type Theme = typeof system
