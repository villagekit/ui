import type { ComponentPropsWithoutRef, ComponentType } from 'react'

export type AspectRatio = 'wide' | 'standard'
export type Orientation = 'portrait' | 'landscape'

/** A statically imported raster image, the shape a bundler gives an imported PNG. */
export interface StaticImageSource {
  src: string
  height: number
  width: number
  blurDataURL?: string
  blurWidth?: number
  blurHeight?: number
}

/** One candidate of an image's `srcset`: the source, the width to render it at and the quality. */
export interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

/** Builds the URL of one candidate width, the way `next/image` calls its `loader`. */
export type ImageLoader = (props: ImageLoaderProps) => string

/**
 * The props `RasterImage` renders the app's image component with: `next/image`'s shape, declared
 * here so the package imports no framework. `next/image` is assignable to `ImageComponent`.
 */
export type ImageComponentProps = Omit<
  ComponentPropsWithoutRef<'img'>,
  'src' | 'srcSet' | 'alt' | 'width' | 'height' | 'loading'
> & {
  src: string | StaticImageSource
  alt: string
  width?: number | `${number}`
  height?: number | `${number}`
  fill?: boolean
  loader?: ImageLoader
  quality?: number | `${number}`
  priority?: boolean
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty' | `data:image/${string}`
  blurDataURL?: string
  unoptimized?: boolean
  overrideSrc?: string
}

/** The app's image component, `next/image` or another that takes `ImageComponentProps`. */
export type ImageComponent = ComponentType<ImageComponentProps>
