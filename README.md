# [Village Kit][villagekit] UI

[![ci](https://github.com/villagekit/ui/actions/workflows/ci.yml/badge.svg)](https://github.com/villagekit/ui/actions/workflows/ci.yml)

A React component library for Village Kit projects, built on [Chakra UI v3][chakra-ui].

[villagekit]: https://villagekit.com
[chakra-ui]: https://chakra-ui.com

## Design principles

- Playful vibes
- Functional interfaces
- Maintainable code
- Accessible HTML

## Demo

Storybook is built on every PR and uploaded as a CI artifact. A live deploy URL is TBD — see [todo/02-ui-library/07-storybook-and-ci.md](https://github.com/villagekit/gridbeam.xyz/blob/main/todo/02-ui-library/07-storybook-and-ci.md) in the consuming repo.

## Where is this used?

- [gridbeam.xyz](https://gridbeam.xyz) — the open-source educational site about grid beam construction
- [villagekit.com](https://villagekit.com)
- [old gridkit.nz](https://gridkit-landing-villagekit.vercel.app/) (legacy)

## Dev

Requires Node 22.12+ (matches Storybook 10's minimum).

```shell
git clone git@github.com:villagekit/ui
cd ui
pnpm install
pnpm run dev
```

`pnpm run dev` starts Storybook on port 6006.

## Scripts

- `dev` — Storybook dev server
- `build:pkg` — build the package via `tsup` to `dist/`
- `build:storybook` — build the Storybook static site to `storybook-static/`
- `lint` — Biome check
- `types` — `tsc --noEmit`
- `publint` — verify the published package layout
- `changeset` — add a changeset entry for the next release
- `version-packages` — consume changesets, bump version, update CHANGELOG (run by release CI, not by hand)
- `release` — publish to npm with the `next` dist-tag (run by release CI)

## Releasing

Versioning + publishing is automated via [Changesets](https://github.com/changesets/changesets).

For each user-facing change, add a changeset entry in the same PR:

```shell
pnpm changeset
```

Pick the bump (patch/minor/major) and write a one-line description. Commit the generated `.changeset/*.md` file.

When PRs land on `main`, the `release` workflow opens a "Version Packages" PR. Merging that PR triggers an npm publish of the new version with the `next` dist-tag.

To cut a stable `1.0.0`:
1. Land all desired changes on `main`.
2. Edit `package.json` to drop the prerelease suffix (`1.0.0-beta.X` → `1.0.0`).
3. Edit `package.json` to drop `"tag": "next"` from `publishConfig`, and change `"release"` script to `changeset publish` (no `--tag`).
4. Push. The release workflow publishes to the default `latest` dist-tag.

## License

Licensed under the EUPL v1.2 ([?](https://choosealicense.com/licenses/eupl-1.2/))
