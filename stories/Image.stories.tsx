import type { Meta, StoryObj } from '@storybook/react'

import { Image, MediaProvider } from '../src'

const meta: Meta = {
  title: 'ui/Media/Image',
}

export default meta

type Story = StoryObj

const GridBeamSvg = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg" role="img" {...props}>
    <title>Grid beam diagram</title>
    <rect x="0" y="8" width="200" height="24" fill="#cbd5e0" stroke="#4a5568" strokeWidth="1" />
    {Array.from({ length: 10 }, (_, i) => i).map((i) => (
      <circle key={`hole-${i}`} cx={10 + i * 20} cy={20} r={3} fill="#1a202c" />
    ))}
  </svg>
)

export const Svg: Story = {
  render() {
    return <Image type="svg" src={GridBeamSvg} alt="A 40 mm grid beam" width="400px" />
  },
}

export const Cloudinary: Story = {
  render() {
    return (
      <MediaProvider cloudinaryName="demo">
        <Image
          type="cloudinary"
          src="samples/landscapes/architecture-signs"
          alt="Stable Cloudinary demo image"
          width={800}
          height={500}
          sizes={{ base: '100vw', md: '600px' }}
        />
      </MediaProvider>
    )
  },
}
