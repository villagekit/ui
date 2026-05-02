import type { Meta, StoryObj } from '@storybook/react'

import { MediaProvider, Video, type VideoProps } from '../src'

const meta: Meta<VideoProps> = {
  component: Video,
  title: 'ui/Media/Video',
}

export default meta

type Story = StoryObj<typeof Video>

export const Cloudinary: Story = {
  render() {
    return (
      <MediaProvider cloudinaryName="demo">
        <Video
          src="samples/elephants"
          title="Stable Cloudinary demo video"
          aspectRatio="wide"
          sizes={{ base: '100vw', md: '600px' }}
        />
      </MediaProvider>
    )
  },
}
