// Provider — wraps consumers with the Village Kit theme system
export { Provider, type ProviderProps } from './Provider'

// Theme
export { config, definePalette, system, theme, type Theme } from './theme'
export {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
  defineSemanticTokens,
  defineTokens,
} from '@chakra-ui/react'

// Custom components (Village Kit-flavoured)
export { Accordion, type AccordionRootProps } from './components/Accordion'
export { Badge, type BadgeProps } from './components/Badge'
export { Button, type ButtonProps } from './components/Button'
export { Checkbox, type CheckboxProps } from './components/Checkbox'
export { FormLabel, type FormLabelProps } from './components/FormLabel'
export { Heading, type HeadingProps } from './components/Heading'
export { HoverCard, HoverCardContainer } from './components/HoverCard'
export type { HoverCardProps, HoverCardContainerProps } from './components/HoverCard'
export { IconButton, type IconButtonProps } from './components/IconButton'
export { InfoTooltip, type InfoTooltipProps } from './components/InfoTooltip'
export { Input, type InputProps } from './components/Input'
export { Link, type LinkProps } from './components/Link'
export { LinkButton, type LinkButtonProps } from './components/LinkButton'
export { LinkCard, type LinkCardProps } from './components/LinkCard'
export { LinkIconButton, type LinkIconButtonProps } from './components/LinkIconButton'
export { NavLink, type NavLinkProps } from './components/NavLink'
export { NumberInput } from './components/NumberInput'
export type { NumberInputProps } from './components/NumberInput'
export { Select, type SelectProps } from './components/Select'
export { Slider, type SliderProps } from './components/Slider'
export { Social, type SocialLinkDescriptor, type SocialProps } from './components/Social'
export { Spinner, type SpinnerProps } from './components/Spinner'
export { Switch, type SwitchProps } from './components/Switch'
export { Table, type TableProps } from './components/Table'
export { Tabs, type TabsProps } from './components/Tabs'
export { Text, type TextProps } from './components/Text'
export { Textarea, type TextareaProps } from './components/Textarea'
export { Tooltip, type TooltipProps } from './components/Tooltip'

// Layout primitives — re-exported from Chakra v3 unchanged
export {
  AbsoluteCenter,
  AspectRatio,
  Box,
  Card,
  Center,
  CloseButton,
  Container,
  Drawer,
  Field,
  Flex,
  Grid,
  Group,
  HStack,
  Icon,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Portal,
  Separator,
  SimpleGrid,
  Skeleton,
  SkipNavContent,
  SkipNavLink,
  Span,
  Square,
  Stack,
  StackSeparator,
  VStack,
  VisuallyHidden,
  Wrap,
  chakra,
} from '@chakra-ui/react'

export type {
  AspectRatioProps,
  BoxProps,
  CenterProps,
  ContainerProps,
  FlexProps,
  GridProps,
  HTMLChakraProps,
  IconProps,
  LinkBoxProps,
  LinkOverlayProps,
  ListRootProps as ListProps,
  ListItemProps,
  ListIndicatorProps,
  RecipeVariantProps,
  SimpleGridProps,
  SkeletonProps,
  StackProps,
  SystemStyleObject,
  WrapProps,
} from '@chakra-ui/react'

// Hooks — re-exported from Chakra v3 unchanged
export {
  mergeRefs,
  useBreakpoint,
  useBreakpointValue,
  useCallbackRef,
  useChakraContext,
  useConst,
  useControllableState,
  useDisclosure,
  useMediaQuery,
  usePrevious,
  useSafeLayoutEffect,
  useUpdateEffect,
} from '@chakra-ui/react'

export type {
  UseBreakpointOptions,
  UseBreakpointValueOptions,
  UseDisclosureProps,
} from '@chakra-ui/react'

// Custom hooks
export * from './hooks/useBreakpointWidth'
export * from './hooks/useIsMobile'
export * from './hooks/useMobileFriendlyTooltip'
export * from './hooks/useSizeWidths'
export * from './hooks/useTheme'
export * from './hooks/useWasRenderedOnClientAtLeastOnce'

// Page layouts
export * from './components/layouts'

// Navigation
export * from './components/nav'

// Media (Image, Video, MediaProvider)
export * from './components/media'
