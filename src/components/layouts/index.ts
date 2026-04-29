export { AnchorHeading, getHeadingId, type AnchorHeadingProps } from './AnchorHeading'
export { BlockSection, type BlockSectionProps } from './BlockSection'
export { CardsLayout, type CardsLayoutProps } from './CardsLayout'
export { Column, useColumnIndex, useIsInColumn, type ColumnProps } from './Column'
export {
  ContentMainLayout,
  ContentMainTocLayout,
  ContentSidenavMainLayout,
  ContentSidenavMainTocLayout,
  type ContentLayoutProps,
} from './ContentLayout'
export { Description, type DescriptionProps } from './Description'
export {
  Footer,
  type FooterLink,
  type FooterProps,
  type FooterSection,
  type FooterSections,
} from './Footer'
export { Main, type MainProps } from './Main'
export { MainLayout, type MainLayoutProps } from './MainLayout'
export { Row, useRowIndex, type RowProps } from './Row'
export { Section, useSectionIndex, type SectionMode, type SectionProps } from './Section'
export { TableOfContents } from './TableOfContents'
export { Title, type TitleProps } from './Title'

// Hooks
export { useActiveHeading } from './hooks/useActiveHeading'
export { useAssertChildIndexes } from './hooks/useAssertChildIndexes'
export { usePageHeadingsTree, type TreeNode } from './hooks/usePageHeadingsTree'
