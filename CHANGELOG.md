# Changelog

All notable changes to `@villagekit/ui` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/).

## Unreleased

The package imported `next/link`, `next/navigation` and `next/image` unconditionally while declaring `next` an optional peer, so it could not render without Next. The app now supplies its framework through the providers.

### Breaking

- **`NavContextProvider` takes `usePathname` and `linkComponent`.** Both optional: pass `usePathname` from `next/navigation` and `Link` from `next/link`, from a client component (a hook cannot cross a server component boundary as a prop), to get the selected nav item and client-side navigation; absent, no item is selected and links render as plain anchors. The nav, `Footer`, `Social`, `MdxLink` and `LinkCard` read them from the provider, so one wiring point serves every composite that renders its own anchors; an app that passes nothing loses the selected item and the client-side navigation 1.2.0 gave it. `Link`, `LinkButton` and `LinkIconButton` keep the explicit `as`.
- **`MediaProvider` takes `imageComponent`.** Pass `next/image` (or any component with its prop shape, `ImageComponentProps`) to have raster images rendered through it; absent, a raster `Image` renders a plain `<img>` on one URL, at the numeric `width` or 1280. A missing cloud name still throws. The deprecated `onLoadingComplete` is no longer forwarded; use `onLoad`.
- **`next` is no longer a peer dependency.** The package imports nothing from it; `ImageComponent`, `ImageComponentProps`, `ImageLoader`, `ImageLoaderProps` and `StaticImageSource` are declared here with `next/image`'s shapes.
- **`LinkCard`'s `icon` is a component type again, and required.** Pass the icon component (`icon={FaCut}`), as the 0.9.0 card took it; 1.2.0 took an optional rendered element (`icon={<FaCut />}`). In an app with server components, pass it from a client module (a function cannot cross a server component boundary as a prop; a `'use client'` module that re-exports the icons is enough). The icon renders in the card's text color; 1.2.0 colored it `primary.600`.
- **`Provider` mounts a `Toaster`.** Toasts render again, at the bottom as Chakra v2's did: call `toaster.create({ title, description, type })` from any component. An app that mounted its own `Toaster` beside the provider now has two.
- **`Footer` is the brand footer.** It takes `socialLinks` (an array of `SocialLinkDescriptor`, or `null` for no row) and renders the social row, its children and the `Created with ♥ by Village Kit` credit below the link columns, the way the legacy `ui-brand` footer wrapped the `ui-page` one; `shouldLinkToCompanyWebsite` (default `true`) links the credit to villagekit.com. `FooterSections` is a tuple of four sections.

### Added

- **`Provider` takes `system`.** An app that extends the package's `config` (`createSystem(defaultConfig, config, ...)`) passes its system here and keeps the provider's toast regions, the way the legacy site passed its extended theme to the ui's `ChakraProvider`; absent, the package's own system.
- **`Link` takes `isExternal` again**, rendering `target="_blank" rel="noopener"`, what Chakra v2's `Link` rendered for the 0.9.0 component.
- **`Social`**, the row of social icon links, with `SocialProps` and `SocialLinkDescriptor` (`href`, `isExternal`, `label`, `Icon`). Each icon carries its link's name; route links go through the framework's link component.

### Fixed

- **Headings weigh `normal`** again, as the 0.9.0 theme set them; 1.1.0 made them `semibold`. A site that loads one face of the heading font renders that face either way.
- **Heading sizes `md` and `lg` are Chakra v2's again**: `md` is `xl` on a 1.2 line (20px), `lg` steps from `2xl` to `3xl` at the `md` breakpoint; 1.1.0 had them one step smaller (`lg`, and `xl` to `2xl`).
- **Inputs, native selects and number inputs take Chakra v2's sizes**: `lg` is 48px tall at font size `lg`, `md` 40px, `sm` 32px, `xs` 24px, rounded `md` (`xs` below `md`); Chakra v3's sizes were 44px, 40px, 36px and 32px at smaller type, rounded `l2`. The focused field borders in the theme's `outlineColor` with a one-pixel shadow, as the 0.9.0 wrappers' `focusBorderColor` did.
- **Focus shows one ring**: buttons, icon buttons, links, inputs, selects, number inputs and accordion triggers show the theme's `outline` shadow on focus and no Chakra v3 focus outline over it. Links show it on keyboard focus only, as Chakra v2's link did.
- **Links transition their color** over 150ms on Chakra v2's ease-out curve on hover, v2's link base.
- **The accordion is the 0.9.0 accordion again**: one 2px dashed rule above each item and below the last (v3's `outline` variant added a 1px rule to every item; the recipe now defaults to `plain`), triggers that fill `blackAlpha.50` on hover, keep square corners and pad `4` vertically (the recipe's `paddingY` was overridden by v3's size variant; it now sets the size's `--accordion-padding-y`), and bodies padded `4` (the padding moves from `itemContent`, which animates, to `itemBody`).
- **`LinkCard` is a fixed `3xs` by `64` box again**, padded `4` by `8`, its icon, heading, description and overlay spread down it with `space-around`, the icon exposed to assistive technology, the heading an `h2` and the wrapper labeled with the title, as the 0.9.0 card was; 1.2.0 let the card fill its cell, packed its content to the top with `paddingX` `6`, hid the icon, rendered an `h3` and dropped the label.
- **`CardsLayout`'s container is `breakpoint-md`** (768px) again, the legacy `container.md`; 1.2.0 had `2xl`.
- **Footer columns sit side by side with no gap from `md` and center their headings and links**, as the legacy footer did; `1.2.0` spread them with a gap of `16` and left-aligned them. The social row sits in a prose-width container, Chakra v2's default, not Chakra v3's `8xl`.

### Changed

- **Footer columns are narrower between `md` and `lg`**: a minimum of `44` (11rem) in place of `3xs`, so four columns fit a 768px viewport.

## 1.2.0

Link components could not route through a framework link, so every internal link they rendered
caused a full document load. This release fixes that across the board.

### Added

- **`LinkCard` regained `linkComponent`.** The v2 component had it; the Chakra v3 migration dropped it, leaving no way to route the overlay anchor through a framework link. `as` still targets the card element, `linkComponent` targets the overlay anchor — same split as v2, because a card has two elements worth swapping.

### Fixed

- **`LinkButton` and `LinkIconButton` now honour `as`.** Both render `Button asChild > Link`, and Chakra v3's factory drops `as` when it resolves `asChild` — so `as={NextLink}` was silently discarded and every internal link fell back to a plain `<a>`, i.e. a full document load with no prefetch. `as` is now destructured out and applied to the inner `Link`, restoring the v2 call-site idiom (`<LinkButton as={NextLink} href="/designs">`).
- **`LinkCard` external links get `rel="noopener noreferrer"` again.** Chakra v3's `LinkOverlay` destructures `rel` off its props and never re-applies it, so the attribute had been silently dropped since the v3 migration — external cards shipped `target="_blank"` bare. `LinkCard` now renders the overlay via `asChild` so its own anchor props survive.
- **`LinkIconButton` sets `rel="noopener noreferrer"`** on external links, matching `LinkButton`.
- **MDX links to internal routes use `NextLink`.** `MdxLink` rendered every non-`http(s)` href as a plain anchor, so in-prose links between pages reloaded the document. Same-page `#hash` links stay plain.
- **`LinkButton` / `LinkIconButton` no longer emit `type="button"` on their anchor** — inherited from Chakra's `Button` default, where `type` is a MIME hint and meaningless on `<a>`.

## 1.1.0

### Changed

- **Heading sizes scale up** at `xl..4xl`. The recipe now ships responsive `xs..4xl` variants (per-breakpoint `fontSize` + `lineHeight`), restoring the legacy v2 villagekit.com scale that Chakra v3's smaller textStyle-based default flattened. Sizes `5xl..7xl` fall through to Chakra's default unchanged (so they keep `letterSpacing: -0.025em` from `textStyles.<n>xl`). Overridden variants explicitly set `textStyle: 'none'` to avoid letter-spacing and other bleed from Chakra's default `textStyle` tokens through the recipe deep-merge. Sites that don't want the larger scale can override the recipe in their own site config.
- **Headings render heavier** by default. `fontWeight` changes from `normal` back to Chakra's `semibold`. The only Fredoka weight both `villagekit.com` and `gridbeam.xyz` load via `next/font` is `600`, so `normal` was being browser-synthesized; `semibold` renders the glyphs the font actually ships.

### Added

- `definePalette(palette, overrides?)` — builds the semantic-token shape (`50..950`, `contrast`, `fg`, `subtle`, `muted`, `emphasized`, `solid`, `border`, `focusRing`) for a given Chakra color name. Use it to wire brand-specific semantic palettes when composing a site `system`:
  ```ts
  import { definePalette, defineSemanticTokens } from '@villagekit/ui'

  defineSemanticTokens.colors({
    primary: definePalette('purple'),
    accentA: definePalette('pink'),
    accentB: definePalette('teal', {
      50: { value: 'color-mix(in oklch, {colors.teal.50}, {colors.teal.100})' },
    }),
  })
  ```
- Re-exported `defineSemanticTokens` and `defineTokens` from `@chakra-ui/react`, so the theme API is consumable from `@villagekit/ui` alone (matches the existing `defineConfig` / `createSystem` / `defaultConfig` re-exports).

## 1.0.0

First release from the standalone `villagekit/ui` repository. Previous versions through 0.9.0 were published from the Grid Kit engine's `core/ui` workspace package; that package has been retired and this library now owns the `@villagekit/ui` name on npm.

### Breaking

- **Chakra UI v3.** Upgraded from Chakra v2; consumers must migrate themes to `createSystem` and update any direct Chakra imports to v3 multipart APIs. See the [Chakra v3 migration guide](https://chakra-ui.com/docs/get-started/migration).
- **React 19 + Next 15.** `peerDependencies` now declare `react ^19.1.0`, `react-dom ^19.1.0`, `next ^15.0.0`.
- **ESM-only.** No CommonJS build is shipped.
- **Recipes split out.** Component recipes (`Button.recipe`, `Switch.recipe`, …) are separate from component wrappers, to keep the recipe imports server-component-safe.

### Added

- Layout primitives folded in from the legacy `@villagekit-private/ui-page` package: `MainLayout`, `ContentLayout`, `CardsLayout`, `Section`, `Row`, `Column`, `TableOfContents`, `AnchorHeading`, `BlockSection`, plus `useActiveHeading` / `usePageHeadingsTree` hooks.
- Navigation components folded in from the legacy `@villagekit-private/ui-nav` package: `NavHeader`, `NavBar`, `NavList`, `NavSide`, `NavMobileMenu`, plus the nav context provider and hooks.
- Media components folded in from the legacy `@villagekit-private/ui-media` package: `Image`, `Video`, `MediaProvider`, `useImageSizes`, `useAspectRatio`. The Cloudinary host is no longer hardcoded — pass it via `MediaProvider`.
- MDX overrides folded in from the legacy `@villagekit-private/ui-mdx` package: `mdxOverrides` covering `a`, `h1`–`h5`, `p`, `ul`, `ol`, `li`, `blockquote`. Available at the `@villagekit/ui/mdx` subpath.
- `tsup` build pipeline producing `dist/` with `.d.ts` types and source maps.
- Storybook 10 with `@storybook/nextjs-vite` framework.
- CI on GitHub Actions: lint, types, build, publint, Storybook build.

### Changed

- TOC hooks (`useActiveHeading`, `usePageHeadingsTree`) are now resilient to skipped heading levels and digit-prefixed IDs.
- External `LinkButton` instances now set `rel="noopener noreferrer"`.
- The package is consumable directly from workspace source during development (via the `source` export condition).
