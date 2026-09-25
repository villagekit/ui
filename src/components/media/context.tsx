'use client'

import { type ReactNode, createContext, useContext } from 'react'

import type { ImageComponent } from './types'

export interface MediaContextValue {
  /**
   * Cloudinary cloud name (the path segment after `res.cloudinary.com/`).
   * `null` means cloudinary is not configured; rendering a `cloudinary`
   * `Image` or `Video` without it throws.
   */
  cloudinaryName: string | null
  /**
   * The app's image component, `next/image` or another with its prop shape.
   * `null` means a raster `Image` renders a plain `<img>` on one URL.
   */
  imageComponent: ImageComponent | null
}

const MediaContext = createContext<MediaContextValue>({
  cloudinaryName: null,
  imageComponent: null,
})

export interface MediaProviderProps {
  cloudinaryName?: string
  imageComponent?: ImageComponent
  children: ReactNode
}

export function MediaProvider(props: MediaProviderProps) {
  const { cloudinaryName = null, imageComponent = null, children } = props
  return (
    <MediaContext.Provider value={{ cloudinaryName, imageComponent }}>
      {children}
    </MediaContext.Provider>
  )
}

export function useMediaContext(): MediaContextValue {
  return useContext(MediaContext)
}

export function useCloudinaryName(): string {
  const { cloudinaryName } = useMediaContext()
  return assertCloudinaryName(cloudinaryName)
}

export function assertCloudinaryName(cloudinaryName: string | null): string {
  if (cloudinaryName == null) {
    throw new Error(
      'Cloudinary cloud name is not configured. Wrap your app in `<MediaProvider cloudinaryName="...">` before rendering a cloudinary image or video.',
    )
  }
  return cloudinaryName
}
