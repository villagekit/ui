/**
 * Sort an array of DOM nodes according to the HTML tree order.
 * @see http://www.w3.org/TR/html5/infrastructure.html#tree-order
 */
export function sortNodes(nodes: Array<Node>): Array<Node> {
  return nodes.sort((a, b) => {
    const compare = a.compareDocumentPosition(b)

    if (
      compare & Node.DOCUMENT_POSITION_FOLLOWING ||
      compare & Node.DOCUMENT_POSITION_CONTAINED_BY
    ) {
      return -1
    }
    if (compare & Node.DOCUMENT_POSITION_PRECEDING || compare & Node.DOCUMENT_POSITION_CONTAINS) {
      return 1
    }
    if (
      compare & Node.DOCUMENT_POSITION_DISCONNECTED ||
      compare & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
    ) {
      throw new Error('Cannot sort the given nodes.')
    }
    return 0
  })
}
