'use client'

import {
  Box,
  type BoxProps,
  type ImageProps as ChakraImageProps,
  type SystemStyleObject,
  chakra,
} from '@chakra-ui/react'
import type React from 'react'
import { useMemo } from 'react'

import { assertCloudinaryName, useMediaContext } from './context'
import { type UseSizesOptions, useAspectRatio, useImageSizes } from './hooks'
import type {
  AspectRatio,
  ImageComponent,
  ImageComponentProps,
  ImageLoader,
  Orientation,
} from './types'
import { getCloudinaryImageUrl } from './url'

// The props the app's image component owns; every other prop is a Chakra style prop.
const imageComponentProps = [
  'src',
  'alt',
  'fill',
  'quality',
  'priority',
  'placeholder',
  'blurDataURL',
  'loader',
  'sizes',
  'onLoad',
  'onError',
  'overrideSrc',
  'width',
  'height',
]

// The width of the one URL a plain `<img>` gets when the app supplies no image component.
const fallbackWidth = 1280

interface BaseImageProps {
  aspectRatio?: AspectRatio
  orientation?: Orientation
}

export type SvgImageProps<ExtraProps extends object = {}> = BaseImageProps &
  BoxProps &
  ExtraProps & {
    type: 'svg'
    src: React.FC<React.SVGProps<SVGSVGElement>>
    alt: string
  }

type BaseChakraImageProps = Omit<
  ChakraImageProps,
  | 'src'
  | 'alt'
  | 'fill'
  | 'sizes'
  | 'width'
  | 'height'
  | 'placeholder'
  | 'objectPosition'
  | 'objectFit'
  | 'color'
  | 'aspectRatio'
  | 'content'
  | 'translate'
  | 'transition'
>
type BaseImageComponentProps = Omit<ImageComponentProps, 'sizes'>
interface BaseRasterImageProps
  extends BaseImageProps,
    BaseChakraImageProps,
    BaseImageComponentProps,
    UseSizesOptions {}

export type LocalImageProps<ExtraProps extends object = {}> = BaseRasterImageProps &
  ExtraProps & { type: 'local' }

export type CloudinaryImageProps<ExtraProps extends object = {}> = BaseRasterImageProps &
  ExtraProps & { type: 'cloudinary' }

export type RasterImageProps<ExtraProps extends object = {}> =
  | LocalImageProps<ExtraProps>
  | CloudinaryImageProps<ExtraProps>
export type ImageProps<ExtraProps extends object = {}> =
  | SvgImageProps<ExtraProps>
  | RasterImageProps<ExtraProps>

export type LocalImagePropsWithOptionalSizes<ExtraProps extends object = {}> = Optional<
  LocalImageProps<ExtraProps>,
  'sizes'
>
export type CloudinaryImagePropsWithOptionalSizes<ExtraProps extends object = {}> = Optional<
  CloudinaryImageProps<ExtraProps>,
  'sizes'
>
export type RasterImagePropsWithOptionalSizes<ExtraProps extends object = {}> =
  | LocalImagePropsWithOptionalSizes<ExtraProps>
  | CloudinaryImagePropsWithOptionalSizes<ExtraProps>
export type ImagePropsWithOptionalSizes<ExtraProps extends object = {}> =
  | SvgImageProps<ExtraProps>
  | RasterImagePropsWithOptionalSizes<ExtraProps>

export type LocalImagePropsWithOptionalSizesAndAlt<ExtraProps extends object = {}> = Optional<
  LocalImageProps<ExtraProps>,
  'sizes' | 'alt'
>
export type CloudinaryImagePropsWithOptionalSizesAndAlt<ExtraProps extends object = {}> = Optional<
  CloudinaryImageProps<ExtraProps>,
  'sizes' | 'alt'
>
export type RasterImagePropsWithOptionalSizesAndAlt<ExtraProps extends object = {}> =
  | LocalImagePropsWithOptionalSizesAndAlt<ExtraProps>
  | CloudinaryImagePropsWithOptionalSizesAndAlt<ExtraProps>
export type ImagePropsWithOptionalSizesAndAlt<ExtraProps extends object = {}> =
  | Optional<SvgImageProps<ExtraProps>, 'alt'>
  | RasterImagePropsWithOptionalSizesAndAlt<ExtraProps>

export function Image(props: ImageProps) {
  const { type } = props
  switch (type) {
    case 'svg':
      return <SvgImage {...props} />
    case 'local':
    case 'cloudinary':
      return <RasterImage {...props} />
  }
}

export function SvgImage(props: SvgImageProps) {
  const { src: Svg, css, aspectRatio: aspectRatioName, orientation, ...rest } = props

  const aspectRatio = useAspectRatio({ aspectRatioName, orientation })

  return (
    <Box css={[{ aspectRatio }, css as SystemStyleObject | undefined]} {...rest}>
      <Svg />
    </Box>
  )
}

export function RasterImage(props: RasterImageProps) {
  const {
    type,
    src,
    alt,
    fill,
    quality = 75,
    aspectRatio: aspectRatioName,
    orientation,
    sizes: breakpointSizes,
    css,
    ...rest
  } = props

  const aspectRatio = useAspectRatio({ aspectRatioName, orientation })
  const sizes = useImageSizes({ sizes: breakpointSizes })
  const { cloudinaryName, imageComponent } = useMediaContext()

  const loader = useMemo<ImageLoader | undefined>(() => {
    if (type !== 'cloudinary') return undefined
    const name = assertCloudinaryName(cloudinaryName)
    return ({ src: loaderSrc, width, quality: loaderQuality }) =>
      getCloudinaryImageUrl({
        cloudinaryName: name,
        src: loaderSrc,
        width,
        quality: loaderQuality,
      })
  }, [type, cloudinaryName])

  const ChakraImage = useMemo(
    () => (imageComponent == null ? null : chakraImage(imageComponent)),
    [imageComponent],
  )

  if (ChakraImage == null) {
    // No framework: one URL on a plain `<img>`, the app's image-only props dropped.
    const {
      priority,
      placeholder: _placeholder,
      blurDataURL: _blurDataURL,
      unoptimized: _unoptimized,
      overrideSrc: _overrideSrc,
      loader: _loader,
      loading,
      width = typeof src === 'string' ? undefined : src.width,
      height = typeof src === 'string' ? undefined : src.height,
      ...imgProps
    } = rest
    const srcString = typeof src === 'string' ? src : src.src
    const plainSrc =
      loader == null
        ? srcString
        : loader({
            src: srcString,
            width: numeric(width) ?? fallbackWidth,
            quality: numeric(quality),
          })
    return (
      <chakra.img
        src={plainSrc}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : loading}
        htmlWidth={fill ? undefined : width}
        htmlHeight={fill ? undefined : height}
        css={[
          { aspectRatio },
          fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%' } : {},
          css as SystemStyleObject | undefined,
        ]}
        {...imgProps}
      />
    )
  }

  return (
    <ChakraImage
      loader={loader}
      src={src}
      alt={alt}
      quality={quality}
      // @ts-ignore: `fill` is a valid image component prop, forwarded via `forwardProps`
      fill={fill}
      sizes={sizes}
      css={[
        {
          aspectRatio,
          // Chakra's chakra(ImageComponent) wrapping forwards `width`/`height` to
          // the image component, but the resolved chakra style system also turns the
          // numeric width/height into CSS dimensions. Undo that so the component's
          // intrinsic-size handling is the authoritative source.
          height: undefined,
          width: undefined,
        },
        css as SystemStyleObject | undefined,
      ]}
      {...rest}
    />
  )
}

function chakraImage(imageComponent: ImageComponent) {
  return chakra(imageComponent, {}, { forwardProps: imageComponentProps })
}

function numeric(value: number | `${number}` | undefined): number | undefined {
  if (value == null) return undefined
  return typeof value === 'number' ? value : Number(value)
}

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
