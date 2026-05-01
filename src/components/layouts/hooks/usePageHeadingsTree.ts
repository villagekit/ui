'use client'

// Adapted from https://github.com/kbrock84/use-page-headings-tree

import { useEffect } from 'react'

interface TreeRoot {
  childrenCount: number
  rootId: string
  element: HTMLElement
  childNodes: Array<TreeNode>
  parentMap?: Array<string>
  index: number
}

export interface TreeNode extends TreeRoot {
  id: string
  text: string
  expanded: boolean
}

type HeadingTag = 'H2' | 'H3' | 'H4' | 'H5' | 'H6'
type LatestRoots = Partial<Record<HeadingTag, string>>
type Roots = Record<HeadingTag, Record<string, TreeRoot>>

let rootIdCounter = 0
function createRootId() {
  rootIdCounter += 1
  return `root-${rootIdCounter}`
}

function checkTag(tagName: string) {
  if (!/^H[2-6]$/.test(tagName)) {
    throw new Error(
      `usePageHeadingsTree: <${tagName.toLowerCase()}> is not supported. Only <h2>–<h6> are.`,
    )
  }
}

function getParentMap(level: HeadingTag, latest: LatestRoots): Array<string> {
  const slot = level[1]
  if (slot == null) return []
  return Object.values(latest).slice(0, Number.parseInt(slot) - 2)
}

function getFlatNodeListFromHeadings(headings: Array<HTMLElement>): Roots {
  const latest: LatestRoots = {}
  const roots: Roots = { H2: {}, H3: {}, H4: {}, H5: {}, H6: {} }

  const defaultRoot = (heading: HTMLElement, index: number): TreeRoot => ({
    childNodes: [],
    childrenCount: 0,
    element: heading,
    index,
    rootId: latest[heading.tagName as HeadingTag] as string,
  })

  headings.forEach((heading, index) => {
    checkTag(heading.tagName)
    const tag = heading.tagName as HeadingTag

    if (tag === 'H2') {
      latest.H2 = createRootId()
      roots.H2[latest.H2] = defaultRoot(heading, index)
      return
    }

    const id = createRootId()
    latest[tag] = id
    roots[tag][id] = { ...defaultRoot(heading, index), parentMap: getParentMap(tag, latest) }
  })

  return roots
}

function transformRootNode(node: TreeRoot, expanded: boolean): TreeNode {
  return {
    ...node,
    expanded,
    id: node.element.id,
    text: node.element.innerText || node.element.innerHTML,
  }
}

function getNodeTreeFromFlatNodeList(roots: Roots, expanded: boolean): Array<TreeNode> {
  const tags: Array<HeadingTag> = ['H2', 'H3', 'H4', 'H5', 'H6']

  for (let i = tags.length - 1; i > 0; i -= 1) {
    const currentTag = tags[i]
    if (currentTag == null) continue
    const current = roots[currentTag]

    for (const childKey of Object.keys(current)) {
      const childRoot = current[childKey]
      if (childRoot == null) continue
      const child = transformRootNode(childRoot, expanded)
      if (child.parentMap == null) continue

      const parentId = child.parentMap[child.parentMap.length - 1]
      if (parentId == null) continue

      // Walk up from the immediate parent level so a skipped heading
      // (e.g. H2 → H4) attaches to the nearest existing ancestor instead of crashing.
      let parent: TreeRoot | undefined
      for (let j = i - 1; j >= 0; j -= 1) {
        const candidateTag = tags[j]
        if (candidateTag == null) continue
        const candidate = roots[candidateTag][parentId]
        if (candidate != null) {
          parent = candidate
          break
        }
      }

      if (!parent) {
        console.warn(
          `usePageHeadingsTree: heading "${child.text}" (#${child.id}) is orphaned — skipping it in the table of contents.`,
        )
        continue
      }

      parent.childrenCount += child.childNodes.length + 1
      parent.childNodes.push(child)
    }
  }

  return Object.values(roots.H2).map((node) => transformRootNode(node, expanded))
}

export function usePageHeadingsTree(
  headings: Array<HTMLElement>,
  callback: (nodes: Array<TreeNode>) => void,
  shouldDefaultToExpand: boolean,
): void {
  useEffect(() => {
    const flat = getFlatNodeListFromHeadings(headings)
    const tree = getNodeTreeFromFlatNodeList(flat, shouldDefaultToExpand)
    callback(tree)
  }, [headings, shouldDefaultToExpand, callback])
}
