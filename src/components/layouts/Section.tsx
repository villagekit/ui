'use client'

import {
  Box,
  Container,
  type ContainerProps,
  Image,
  type ImageProps,
  Stack,
  type StackProps,
  mergeRefs,
} from '@chakra-ui/react'
import { type ReactNode, createContext, forwardRef, useContext } from 'react'

import { useAssertChildIndexes } from './hooks/useAssertChildIndexes'

const SectionIndexContext = createContext<number>(-1)

export const useSectionIndex = () => useContext(SectionIndexContext)

export type SectionMode = 'yborder-bg' | 'yborder' | 'roundborder'

export interface SectionProps extends Omit<StackProps, 'backgroundImage'> {
  index: number
  backgroundImage?: ImageProps
  /** Chakra v3 colour palette key, e.g. `'accentB'`, `'gray'`. */
  colorPalette?: string
  maxW?: ContainerProps['maxW']
  children: ReactNode | Array<ReactNode>
  mode?: SectionMode
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(function Section(props, ref) {
  const {
    index,
    backgroundImage,
    colorPalette,
    maxW = '2xl',
    children,
    css,
    id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    mode = 'yborder-bg',
    ...stackProps
  } = props

  const assertChildIndexesRef = useAssertChildIndexes<HTMLDivElement>({
    childClassName: 'vk-row',
  })

  // The legacy ui-page Section's three modes (packages/ui-page/src/components/Section.tsx at
  // fce357d): the palette's 50 fill and a 2px dashed rule in its 200 shade, `yborder-bg` ruled top
  // and bottom, `yborder` the rules alone, `roundborder` ruled on every side under an `xl` radius.
  // These three stay the legacy author's; a new visual takes a new mode.
  const paletteCss = colorPalette
    ? mode === 'yborder-bg'
      ? {
          backgroundColor: 'colorPalette.50',
          borderBottomWidth: 2,
          borderColor: 'colorPalette.200',
          borderStyle: 'dashed',
          borderTopWidth: 2,
        }
      : mode === 'yborder'
        ? {
            borderBottomWidth: 2,
            borderColor: 'colorPalette.200',
            borderStyle: 'dashed',
            borderTopWidth: 2,
          }
        : {
            backgroundColor: 'colorPalette.50',
            borderBottomWidth: 2,
            borderColor: 'colorPalette.200',
            borderLeftWidth: 2,
            borderRadius: 'xl',
            borderRightWidth: 2,
            borderStyle: 'dashed',
            borderTopWidth: 2,
          }
    : {}

  return (
    <SectionIndexContext.Provider value={index}>
      <Box
        ref={mergeRefs(ref, assertChildIndexesRef)}
        id={id}
        as="section"
        className="vk-section"
        data-index={index}
        colorPalette={colorPalette}
        css={[
          {
            paddingY: backgroundImage != null ? 8 : 0,
            position: 'relative',
            width: '100%',
            ...paletteCss,
          },
          css,
        ]}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        <Container maxW={maxW} py={[8, null, 12]}>
          <Stack direction="column" gap="8" {...stackProps}>
            {children}
          </Stack>
        </Container>

        {backgroundImage != null && (
          <Image
            {...backgroundImage}
            css={[
              {
                boxShadow: 'md',
                height: '100%',
                left: 0,
                objectFit: 'cover',
                position: 'absolute',
                top: 0,
                width: '100%',
                zIndex: -1,
              },
              backgroundImage.css,
            ]}
          />
        )}
      </Box>
    </SectionIndexContext.Provider>
  )
})
