'use client'

import { type SystemStyleObject, chakra } from '@chakra-ui/react'
import type React from 'react'
import { useCallback } from 'react'

import { useCloudinaryName } from './context'
import { type UseSizesOptions, useAspectRatio, useVideoSizes } from './hooks'
import type { AspectRatio, Orientation } from './types'
import { getCloudinaryVideoUrls } from './url'

interface CloudinaryVideoProps {
  src: string
  posterSrc?: string
}

export interface VideoProps extends CloudinaryVideoProps, UseSizesOptions {
  aspectRatio?: AspectRatio
  orientation?: Orientation
  title: string
  css?: SystemStyleObject
}

export function Video(props: VideoProps) {
  const { src, posterSrc, css, title, sizes, aspectRatio: aspectRatioName, orientation } = props

  const aspectRatio = useAspectRatio({ aspectRatioName, orientation })
  const width = useVideoSizes({ sizes })
  const cloudinaryName = useCloudinaryName()

  const { posterUrl, videoUrl } = getCloudinaryVideoUrls({
    cloudinaryName,
    posterSrc,
    src,
    width,
  })

  const handleClick = useCallback(
    (ev: React.MouseEvent<HTMLDivElement> & React.MouseEvent<HTMLVideoElement>) => {
      const video = ev.target as HTMLVideoElement
      if (video.paused) {
        void video.play()
      } else {
        video.pause()
      }
    },
    [],
  )

  return (
    <chakra.video
      title={title}
      autoPlay
      loop
      muted
      playsInline
      poster={posterUrl}
      onClick={handleClick}
      css={[{ aspectRatio }, css]}
    >
      <source src={`${videoUrl}.webm`} type="video/webm" />
      <source src={`${videoUrl}.mp4`} type="video/mp4" />
      <source src={`${videoUrl}.ogv`} type="video/ogg" />
    </chakra.video>
  )
}
