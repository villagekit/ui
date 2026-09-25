// ported from https://github.com/villagekit/node-modules/blob/fce357d/packages/ui-mdx/src/Video.tsx
'use client'

import { Video as BaseVideo, type VideoProps as BaseVideoProps } from '../components/media/Video'
import { MediaContainer, useMediaMaxWidthBreakpoints } from './MediaContainer'

/** The media `Video`'s props with `sizes` optional, the container's bounds being the default. */
export type VideoProps = Optional<BaseVideoProps, 'sizes'>

/** A story video in a `MediaContainer`, sized to the container's bounds unless `sizes` is given. */
export function Video(props: VideoProps) {
  const maxWidthBreakpoints = useMediaMaxWidthBreakpoints()

  return (
    <MediaContainer>
      <BaseVideo sizes={maxWidthBreakpoints} {...props} />
    </MediaContainer>
  )
}

type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>
