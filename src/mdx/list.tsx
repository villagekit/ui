'use client'

import { List, type ListItemProps, type ListRootProps } from '@chakra-ui/react'

export function MdxUnorderedList(props: ListRootProps) {
  return <List.Root as="ul" alignSelf="flex-start" pl="4" gap="1" {...props} />
}

export function MdxOrderedList(props: ListRootProps) {
  return <List.Root as="ol" alignSelf="flex-start" pl="4" gap="1" {...props} />
}

export function MdxListItem(props: ListItemProps) {
  return <List.Item {...props} />
}
