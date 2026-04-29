'use client'

import { Box, type BoxProps, List } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { Heading } from '../Heading'
import { Link } from '../Link'
import { useActiveHeading } from './hooks/useActiveHeading'
import { type TreeNode, usePageHeadingsTree } from './hooks/usePageHeadingsTree'

interface TableOfContentsProps {
  outerContainerProps?: BoxProps
  innerContainerProps?: BoxProps
}

export function TableOfContents(props: TableOfContentsProps) {
  const { outerContainerProps, innerContainerProps } = props

  const [pageHeadingNodes, setPageHeadingNodes] = useState<Array<HTMLElement>>([])
  const [pageHeadingTree, setPageHeadingTree] = useState<Array<TreeNode> | null>(null)

  useEffect(() => {
    const main = document.querySelector('.vk-main')
    if (main == null) return

    const nodes: Array<HTMLElement> = Array.from(main.querySelectorAll('h2,h3,h4,h5,h6'))
    setPageHeadingNodes(nodes)
  }, [])

  usePageHeadingsTree(pageHeadingNodes, setPageHeadingTree, false)

  const pageHeadingList = useMemo(
    () => pageHeadingNodes.map((node) => `#${node.id}`),
    [pageHeadingNodes],
  )
  const activeHeading = useActiveHeading(pageHeadingList)

  return (
    <Box as="nav" {...outerContainerProps}>
      <Box {...innerContainerProps}>
        <Heading size="sm" mb="2">
          On this page
        </Heading>

        {pageHeadingTree && (
          <List.Root gap="2">
            {pageHeadingTree.map(function renderNodeItem(node) {
              const isActive = node.element.id === activeHeading?.substring(1)
              return (
                <List.Item key={node.id}>
                  <Link
                    href={`#${node.element.id}`}
                    variant="secondary"
                    css={isActive ? { color: 'primary.700', fontWeight: 'bold' } : undefined}
                  >
                    {node.text}
                  </Link>

                  {node.childNodes.length > 0 && (
                    <List.Root gap="2" ml="2" mt="2">
                      {node.childNodes.map(renderNodeItem)}
                    </List.Root>
                  )}
                </List.Item>
              )
            })}
          </List.Root>
        )}
      </Box>
    </Box>
  )
}
