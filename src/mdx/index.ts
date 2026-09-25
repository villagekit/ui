import type { MDXComponents } from 'mdx/types'

import { MdxBlockquote } from './blockquote'
import { MdxH1, MdxH2, MdxH3, MdxH4, MdxH5 } from './heading'
import { MdxLink } from './link'
import { MdxListItem, MdxOrderedList, MdxUnorderedList } from './list'
import { MdxParagraph } from './paragraph'

export const mdxComponents = {
  a: MdxLink as MDXComponents['a'],
  blockquote: MdxBlockquote as MDXComponents['blockquote'],
  h1: MdxH1 as MDXComponents['h1'],
  h2: MdxH2 as MDXComponents['h2'],
  h3: MdxH3 as MDXComponents['h3'],
  h4: MdxH4 as MDXComponents['h4'],
  h5: MdxH5 as MDXComponents['h5'],
  li: MdxListItem as MDXComponents['li'],
  ol: MdxOrderedList as MDXComponents['ol'],
  p: MdxParagraph as MDXComponents['p'],
  ul: MdxUnorderedList as MDXComponents['ul'],
} satisfies MDXComponents

export {
  MdxBlockquote,
  type MdxBlockquoteProps,
} from './blockquote'
export { MdxH1, MdxH2, MdxH3, MdxH4, MdxH5 } from './heading'
export { MdxLink } from './link'
export { MdxListItem, MdxOrderedList, MdxUnorderedList } from './list'
export { MdxParagraph } from './paragraph'

// Media for a story to import beside the prose, as the legacy ui-mdx package exported them
export { Image, type ImageProps } from './Image'
export {
  MediaContainer,
  type MediaContainerProps,
  useMediaMaxWidthBreakpoints,
} from './MediaContainer'
export { Video, type VideoProps } from './Video'
