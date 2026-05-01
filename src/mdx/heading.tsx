'use client'

import {
  AnchorHeading,
  type AnchorHeadingProps,
  Title,
  type TitleProps,
} from '../components/layouts'

export function MdxH1(props: TitleProps) {
  return <Title as="h1" hasAnchor {...props} />
}

export function MdxH2(props: AnchorHeadingProps) {
  return <MdxHeading as="h2" size="lg" {...props} />
}

export function MdxH3(props: AnchorHeadingProps) {
  return <MdxHeading as="h3" size="md" {...props} />
}

export function MdxH4(props: AnchorHeadingProps) {
  return <MdxHeading as="h4" size="sm" {...props} />
}

export function MdxH5(props: AnchorHeadingProps) {
  return <MdxHeading as="h5" size="xs" {...props} />
}

function MdxHeading(props: AnchorHeadingProps) {
  return <AnchorHeading hasAnchor alignSelf="flex-start" pt="2" {...props} />
}
