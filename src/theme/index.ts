import { createSystem, defaultConfig, defineConfig, defineTokens } from '@chakra-ui/react'

import { accordionRecipe } from '../components/Accordion.recipe'
import { badgeRecipe } from '../components/Badge.recipe'
import { buttonRecipe } from '../components/Button'
import { checkboxRecipe } from '../components/Checkbox.recipe'
import { fieldRecipe } from '../components/FormLabel.recipe'
import { headingRecipe } from '../components/Heading'
import { linkRecipe } from '../components/Link'
import { navLinkRecipe } from '../components/NavLink'
import { sliderRecipe } from '../components/Slider.recipe'
import { switchRecipe } from '../components/Switch.recipe'
import { tableRecipe } from '../components/Table.recipe'
import { tabsRecipe } from '../components/Tabs'
import { textRecipe } from '../components/Text'
import { colorSemanticTokens, colorTokens } from './colors'

const systemFontFallback =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

const fonts = defineTokens.fonts({
  body: { value: `Bitter, ${systemFontFallback}` },
  heading: { value: `"Fredoka One", ${systemFontFallback}` },
})

const shadows = defineTokens.shadows({
  outline: { value: '0 0 0 2px {colors.outlineColor}' },
  outlineLarge: { value: '0 0 0 4px {colors.outlineColor}' },
})

const config = defineConfig({
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
      link: linkRecipe,
      navLink: navLinkRecipe,
      text: textRecipe,
    },
    slotRecipes: {
      accordion: accordionRecipe,
      checkbox: checkboxRecipe,
      field: fieldRecipe,
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
