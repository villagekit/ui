'use client'

import {
  TabsList as BaseTabsList,
  TabsContent,
  TabsContentGroup,
  TabsIndicator,
  type TabsListProps,
  TabsRoot,
  TabsTrigger,
  defineSlotRecipe,
  mergeRefs,
} from '@chakra-ui/react'
import { forwardRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

export type {
  TabsContentProps,
  TabsListProps,
  TabsRootProps as TabsProps,
  TabsTriggerProps,
} from '@chakra-ui/react'

const isClient = typeof window !== 'undefined'
const useSafeLayoutEffect = isClient ? useLayoutEffect : useEffect

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(props, ref) {
  const tabsRef = useRef<HTMLDivElement>(null)
  const [fadeOut, setFadeOut] = useState(false)

  const updateFadeOut = useCallback(() => {
    if (tabsRef.current != null) {
      const { clientWidth, scrollWidth } = tabsRef.current
      setFadeOut(scrollWidth > clientWidth)
    }
  }, [])

  useSafeLayoutEffect(() => {
    updateFadeOut()
    window.addEventListener('resize', updateFadeOut)
    return () => {
      window.removeEventListener('resize', updateFadeOut)
    }
  }, [updateFadeOut])

  return (
    <BaseTabsList
      ref={mergeRefs(tabsRef, ref)}
      css={
        fadeOut
          ? {
              '&::before': {
                content: '""',
                position: 'absolute',
                zIndex: 5,
                top: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0), white 85%)',
                width: '16',
              },
            }
          : undefined
      }
      {...props}
    />
  )
})

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
  ContentGroup: TabsContentGroup,
  Indicator: TabsIndicator,
}

export const tabsRecipe = defineSlotRecipe({
  slots: ['root', 'list', 'trigger', 'content', 'indicator', 'contentGroup'],
  base: {
    root: {
      position: 'relative',
    },
    list: {
      marginBottom: '2',
      overflowX: 'auto',
      '&::after': {
        borderBottomWidth: '2px',
        borderStyle: 'dashed',
        content: '""',
        display: 'block',
        flex: '1',
      },
    },
    trigger: {
      borderBottomWidth: '2px',
      borderStyle: 'dashed',
      fontFamily: 'heading',
      marginRight: '1',
      position: 'relative',
      whiteSpace: 'nowrap',
      _hover: { color: 'primary.700' },
      _focus: { color: 'primary.700' },
      _selected: {
        borderColor: 'primary.300',
        boxShadow: 'none',
        zIndex: 10,
      },
      _disabled: {
        color: 'gray.300',
        cursor: 'not-allowed',
      },
    },
    content: {
      padding: '4',
      position: 'relative',
      zIndex: 10,
    },
  },
})
