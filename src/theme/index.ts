import { createSystem, defaultConfig, defineConfig, defineTokens } from '@chakra-ui/react'

import { accordionRecipe } from '../components/Accordion.recipe'
import { badgeRecipe } from '../components/Badge.recipe'
import { buttonRecipe } from '../components/Button'
import { checkboxRecipe } from '../components/Checkbox.recipe'
import { fieldRecipe } from '../components/FormLabel.recipe'
import { headingRecipe } from '../components/Heading'
import { inputRecipe } from '../components/Input'
import { linkRecipe } from '../components/Link'
import { navLinkRecipe } from '../components/NavLink'
import { numberInputRecipe } from '../components/NumberInput'
import { nativeSelectRecipe } from '../components/Select'
import { sliderRecipe } from '../components/Slider.recipe'
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

const shadows = defineTokens.shadows({
  outline: { value: '0 0 0 2px {colors.outlineColor}' },
  outlineLarge: { value: '0 0 0 4px {colors.outlineColor}' },
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
    },
    recipes: {
      badge: badgeRecipe,
      button: buttonRecipe,
      heading: headingRecipe,
      input: inputRecipe,
      link: linkRecipe,
      navLink: navLinkRecipe,
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
