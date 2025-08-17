import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    clearable: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    helperText: 'This will be your public display name',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    label: 'Email',
    placeholder: 'Enter your email',
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    label: 'Search',
    placeholder: 'Search...',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Small Input',
    placeholder: 'Small size',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    label: 'Medium Input',
    placeholder: 'Medium size',
  },
};
export const Large: Story = {
  args: {
    size: "large",
    label: 'Large Input',
    placeholder: 'Large size',
    helperText: "",
    errorMessage: "",
    disabled: false,
    clearable: false,
    type: "",
    loading: false,
    value: ""
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot interact',
    disabled: true,
  },
};

export const Invalid: Story = {
  args: {
    label: 'Invalid Input',
    placeholder: 'Something went wrong',
    invalid: true,
    errorMessage: 'This field is required',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Clearable Input',
    placeholder: "",
    clearable: true,
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading State',
    placeholder: 'Checking availability...',
    loading: true,
  },
};