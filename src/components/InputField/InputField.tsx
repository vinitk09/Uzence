import React, { useState } from 'react';

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  clearable?: boolean;
  type?: string;
  loading?: boolean;
  className?: string;
}

export const InputField = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = 'outlined',
  size = 'medium',
  clearable = false,
  type = 'text',
  loading = false,
  className = '',
  ...props
}: InputFieldProps) => {
  const [inputType, setInputType] = useState(type);
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInputValue('');
    const event = {
      target: { value: '' },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange?.(event);
  };

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  // Base classes
  const baseClasses = [
    'w-full',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'rounded-md',
    'text-gray-800',
    'placeholder-gray-400',
    'font-sans',
  ];

  // Variant classes
  const variantClasses = {
    filled: [
      'bg-gray-50',
      'hover:bg-gray-100',
      'focus:bg-white',
      'border',
      'border-gray-200',
      'focus:border-blue-500',
    ],
    outlined: [
      'bg-white',
      'border',
      'border-gray-300',
      'hover:border-gray-400',
      'focus:border-blue-500',
    ],
    ghost: [
      'bg-transparent',
      'border-b',
      'border-gray-300',
      'hover:border-gray-400',
      'focus:border-gray-400',
      'rounded-none',
    ],
  };

  // Size classes
  const sizeClasses = {
    small: ['px-2.5', 'py-1.5', 'text-sm'],
    medium: ['px-3', 'py-2', 'text-base'],
    large: ['px-4', 'py-2.5', 'text-lg'],
  };

  // State classes
  const stateClasses = [
    disabled ? 'opacity-60 cursor-not-allowed bg-gray-100' : '',
    invalid
      ? 'border-red-500 focus:ring-red-200 focus:border-red-500'
      : 'focus:ring-blue-200 focus:border-blue-500',
  ];

  // Calculate right position for icons based on size
  const iconRightClass = {
    small: 'right-2',
    medium: 'right-2.5',
    large: 'right-3',
  }[size];

  const inputClasses = [
    ...baseClasses,
    ...variantClasses[variant],
    ...sizeClasses[size],
    ...stateClasses,
    className,
  ].join(' ');

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label
          className={`block text-sm font-medium ${
            invalid ? 'text-red-600' : 'text-gray-700'
          }`}
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          {...props}
        />
        
        {/* Loading indicator */}
        {loading && (
          <div className={`absolute ${iconRightClass} top-1/2 -translate-y-1/2`}>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-400 border-t-transparent"></div>
          </div>
        )}
        
        {/* Clear button */}
        {clearable && inputValue && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${iconRightClass} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
            disabled={disabled}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        
        {/* Password toggle */}
        {type === 'password' && !loading && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={`absolute ${iconRightClass} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
            disabled={disabled}
          >
            {inputType === 'password' ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {/* Helper text or error message */}
      {errorMessage && invalid ? (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      ) : helperText ? (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};