import type { Meta, StoryObj } from '@storybook/react'

import { Box, MediaProvider } from '../src'
import {
  Image,
  MdxBlockquote,
  MdxH1,
  MdxH2,
  MdxH3,
  MdxLink,
  MdxListItem,
  MdxOrderedList,
  MdxParagraph,
  MdxUnorderedList,
  Video,
} from '../src/mdx'

const meta: Meta = {
  title: 'ui/MDX',
}

export default meta

type Story = StoryObj

export const Sample: Story = {
  render() {
    return (
      <Box maxW="2xl">
        <MdxH1>Page heading</MdxH1>
        <MdxParagraph>
          A short introduction paragraph that demonstrates how the MDX{' '}
          <MdxLink href="https://example.com">link override</MdxLink> renders inline.
        </MdxParagraph>

        <MdxH2>A subsection</MdxH2>
        <MdxParagraph>
          This subsection shows the H2 override with anchor links and the paragraph spacing.
        </MdxParagraph>

        <MdxH3>An ordered list</MdxH3>
        <MdxOrderedList>
          <MdxListItem>Cut the grid beams to length.</MdxListItem>
          <MdxListItem>Drill the holes on the 40 mm grid.</MdxListItem>
          <MdxListItem>Bolt the beams together.</MdxListItem>
        </MdxOrderedList>

        <MdxH3>An unordered list</MdxH3>
        <MdxUnorderedList>
          <MdxListItem>40 mm aluminium grid beam</MdxListItem>
          <MdxListItem>M6 button-head bolts</MdxListItem>
          <MdxListItem>4 mm hex key</MdxListItem>
        </MdxUnorderedList>

        <MdxH3>A blockquote</MdxH3>
        <MdxBlockquote>
          <MdxParagraph>
            Grid beam is a beam, drilled with regularly-spaced holes. Bolt it together with a hex
            key and you have a reconfigurable structure.
          </MdxParagraph>
        </MdxBlockquote>
      </Box>
    )
  },
}

export const Media: Story = {
  render() {
    return (
      <MediaProvider cloudinaryName="demo">
        <Box display="flex" flexDirection="column" gap="8" maxW="2xl">
          <MdxParagraph>An image and a video bounded by the media container.</MdxParagraph>
          <Image
            type="cloudinary"
            src="samples/landscapes/architecture-signs"
            alt="Stable Cloudinary demo image"
            width={800}
            height={500}
            aspectRatio="standard"
          />
          <Video src="samples/elephants" title="Stable Cloudinary demo video" aspectRatio="wide" />
        </Box>
      </MediaProvider>
    )
  },
}
