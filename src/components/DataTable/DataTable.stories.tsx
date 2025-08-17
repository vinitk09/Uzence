import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from './DataTable';
import React from 'react';

// Define the Column interface with proper generics
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, record: T) => React.ReactNode;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin: string;
}

const mockUsers: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', lastLogin: '2023-05-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', lastLogin: '2023-06-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', lastLogin: '2023-04-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'active', lastLogin: '2023-06-18' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive', lastLogin: '2023-03-05' },
];

// Explicitly type the columns array
const columns: Column<User>[] = [
  { 
    key: 'name', 
    title: 'Name', 
    dataIndex: 'name', 
    sortable: true 
  },
  { 
    key: 'email', 
    title: 'Email', 
    dataIndex: 'email', 
    sortable: true 
  },
  { 
    key: 'role', 
    title: 'Role', 
    dataIndex: 'role', 
    sortable: true 
  },
  { 
    key: 'status', 
    title: 'Status', 
    dataIndex: 'status',
    render: (value: 'active' | 'inactive') => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </span>
    )
  },
  { 
    key: 'lastLogin', 
    title: 'Last Login', 
    dataIndex: 'lastLogin', 
    sortable: true 
  },
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable<User>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    onRowSelect: {
      action: 'rowsSelected',
    },
  },
} satisfies Meta<typeof DataTable<User>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockUsers,
    columns: columns,
  },
};

export const Selectable: Story = {
  args: {
    data: mockUsers,
    columns: columns,
    selectable: true,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    loading: false,
  },
};

export const WithCustomRender: Story = {
  args: {
    data: mockUsers,
    columns: [
      { 
        key: 'name', 
        title: 'Name', 
        dataIndex: 'name', 
        sortable: true 
      },
      { 
        key: 'email', 
        title: 'Email', 
        dataIndex: 'email',
        render: (value: string) => (
          <a href={`mailto:${value}`} className="text-blue-600 hover:underline">
            {value}
          </a>
        )
      },
      { 
        key: 'status', 
        title: 'Account Status', 
        dataIndex: 'status',
        render: (value: 'active' | 'inactive') => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </span>
        )
      },
    ] as Column<User>[],
    selectable: true,
  },
};

export const SmallDataset: Story = {
  args: {
    data: mockUsers.slice(0, 2),
    columns: columns,
    selectable: true,
  },
};
// also make this resposnive