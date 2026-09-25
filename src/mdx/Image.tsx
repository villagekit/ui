// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/Image.tsx
'use client'

import {
  Image as BaseImage,
  type ImagePropsWithOptionalSizes as BaseImageProps,
} from '../components/media/Image'
import { MediaContainer, useMediaMaxWidthBreakpoints } from './MediaContainer'

/** The media `Image`'s props with `sizes` optional, the container's bounds being the default. */
export type ImageProps = BaseImageProps

/** A story image in a `MediaContainer`, sized to the container's bounds unless `sizes` is given. */
export function Image(props: ImageProps) {
  const { type } = props

  const maxWidthBreakpoints = useMediaMaxWidthBreakpoints()

  const content =
    type === 'svg' ? <BaseImage {...props} /> : <BaseImage sizes={maxWidthBreakpoints} {...props} />

  return <MediaContainer>{content}</MediaContainer>
}
