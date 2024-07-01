import React from 'react';

interface InputProps {
  type: string;
  id: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  className,
  placeholder,
  required = false
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`mt-1 w-full px-3 py-2 rounded-md bg-gray-700 border border-gray-600 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${className}`}
      required={required}
    />
  );
};

export default Input;
