'use client'

import { type ReactNode, createContext, useContext } from 'react'

import type { ImageComponent } from './types'

/** The cloud the legacy `ui-media` package hard-coded; the context's value unless a `MediaProvider` overrides it. */
export const defaultCloudinaryName = 'villagekit'

export interface MediaContextValue {
  /** Cloudinary cloud name (the path segment after `res.cloudinary.com/`), `villagekit` by default. */
  cloudinaryName: string
  /**
   * The app's image component, `next/image` or another with its prop shape.
   * `null` means a raster `Image` renders a plain `<img>` on one URL.
   */
  imageComponent: ImageComponent | null
}

const MediaContext = createContext<MediaContextValue>({
  cloudinaryName: defaultCloudinaryName,
  imageComponent: null,
})

export interface MediaProviderProps {
  cloudinaryName?: string
  imageComponent?: ImageComponent
  children: ReactNode
}

/** Overrides the cloud name for another Cloudinary account, and supplies the app's image component. */
export function MediaProvider(props: MediaProviderProps) {
  const { cloudinaryName = defaultCloudinaryName, imageComponent = null, children } = props
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
  return cloudinaryName
}
