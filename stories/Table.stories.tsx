import type { Meta, StoryObj } from '@storybook/react'

import { Table, type TableProps } from '../src/components/Table'

const meta: Meta<TableProps> = {
  component: Table.Root,
  title: 'ui/Table',
}

export default meta

type Story = StoryObj<typeof Table.Root>

const rows = [
  { name: 'Grid beam (40 mm)', length: '500 mm', holes: 12 },
  { name: 'Grid beam (40 mm)', length: '1000 mm', holes: 24 },
  { name: 'Grid panel (40 mm)', length: '400 × 800 mm', holes: 200 },
]

export const Basic: Story = {
  render() {
    return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Part</Table.ColumnHeader>
            <Table.ColumnHeader>Length</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Holes</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rows.map((row) => (
            <Table.Row key={`${row.name}-${row.length}`}>
              <Table.Cell>{row.name}</Table.Cell>
              <Table.Cell>{row.length}</Table.Cell>
              <Table.Cell textAlign="end">{row.holes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    )
  },
}
