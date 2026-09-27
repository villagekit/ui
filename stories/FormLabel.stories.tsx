import type { Meta, StoryObj } from '@storybook/react'

import { Field, Input } from '../src'
import { FormLabel, type FormLabelProps } from '../src/components/FormLabel'

const meta: Meta<FormLabelProps> = {
  component: FormLabel,
  title: 'ui/FormLabel',
}

export default meta

type Story = StoryObj<typeof FormLabel>

export const Basic: Story = {
  render() {
    return (
      <Field.Root maxW="sm">
        <FormLabel htmlFor="email">Email</FormLabel>
        <Input id="email" type="email" placeholder="you@example.com" />
      </Field.Root>
    )
  },
}
