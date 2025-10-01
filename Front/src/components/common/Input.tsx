// src/components/common/Input.tsx
import React from 'react';

interface InputProps {
  type?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  label,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  icon,
  required = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-Text-Primary mb-2">
          {label}
          {required && <span className="text-Error-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            w-full px-4 py-3 ${icon ? 'pl-11' : ''} 
            border-2 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-Primary-500 focus:border-transparent
            transition-all duration-200
            ${error ? 'border-Error-500' : 'border-gray-200'}
            ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
            text-Text-Primary placeholder-gray-400
          `}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-Error-500">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-Text-Secondary">{helperText}</p>
      )}
    </div>
  );
};

export default Input;