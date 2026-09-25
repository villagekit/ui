// Cloudinary URL builders.
//
// Pure functions: take `cloudinaryName` as input, return a URL. The
// `cloudinaryName` is the cloud account name on Cloudinary (the path
// segment after `res.cloudinary.com/`); the components read it from the
// media context, `villagekit` unless a `<MediaProvider cloudinaryName="..." />`
// overrides it.

export interface GetCloudinaryImageUrlOptions {
  cloudinaryName: string
  src: string
  width: number
  quality?: number
}

export function getCloudinaryImageUrl(options: GetCloudinaryImageUrlOptions): string {
  const { cloudinaryName, src, width, quality = 75 } = options

  const baseUrl = `https://res.cloudinary.com/${cloudinaryName}`
  const transformations = `c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_${width},q_${quality}`

  return `${baseUrl}/image/upload/${transformations}/${src}`
}

export interface GetCloudinaryVideoUrlsOptions {
  cloudinaryName: string
  src: string
  posterSrc?: string
  width?: number
}

export interface CloudinaryVideoUrls {
  videoUrl: string
  posterUrl: string | undefined
}

export function getCloudinaryVideoUrls(
  options: GetCloudinaryVideoUrlsOptions,
): CloudinaryVideoUrls {
  const { cloudinaryName, src, posterSrc, width = 640 } = options

  const baseUrl = `https://res.cloudinary.com/${cloudinaryName}`

  const videoTransformations = `c_limit,dpr_auto,f_auto,w_${width}`
  const videoUrl = `${baseUrl}/video/upload/${videoTransformations},q_60/v1/${src}`

  const posterTransformations = `c_limit,dpr_auto,f_auto,fl_alpha,fl_lossy,w_${width},q_60`
  const posterUrl =
    posterSrc == null
      ? undefined
      : `${baseUrl}/image/upload/${posterTransformations}/v1/${posterSrc}`

  return { posterUrl, videoUrl }
}
