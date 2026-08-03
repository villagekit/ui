# Changelog

All notable changes to `@villagekit/ui` are documented here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [SemVer](https://semver.org/).

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
