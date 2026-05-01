'use client'

import {
  Box,
  type BoxProps,
  type ImageProps as ChakraImageProps,
  type SystemStyleObject,
  chakra,
} from '@chakra-ui/react'
import NextImage, { type ImageLoader, type ImageProps as NextImageProps } from 'next/image'
import type React from 'react'
import { useMemo } from 'react'

import { assertCloudinaryName, useMediaContext } from './context'
import { type UseSizesOptions, useAspectRatio, useImageSizes } from './hooks'
import type { AspectRatio, Orientation } from './types'
import { getCloudinaryImageUrl } from './url'

const ChakraNextImage = chakra(
  NextImage,
  {},
  {
    forwardProps: [
      'src',
      'alt',
      'fill',
      'quality',
      'priority',
      'placeholder',
      'blurDataURL',
      'loader',
      'sizes',
      'onLoadingComplete',
      'onLoad',
      'onError',
      'width',
      'height',
    ],
  },
)

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
type BaseNextImageProps = Omit<NextImageProps, 'sizes'>
interface BaseRasterImageProps
  extends BaseImageProps,
    BaseChakraImageProps,
    BaseNextImageProps,
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
  const { cloudinaryName } = useMediaContext()

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

  return (
    <ChakraNextImage
      loader={loader}
      src={src}
      alt={alt}
      quality={quality}
      // @ts-ignore — `fill` is a valid NextImage prop, forwarded via `forwardProps`
      fill={fill}
      sizes={sizes}
      css={[
        {
          aspectRatio,
          // Chakra's chakra(NextImage) wrapping forwards `width`/`height` to
          // NextImage, but the resolved chakra style system also turns the
          // numeric width/height into CSS dimensions. Undo that so NextImage's
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

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
