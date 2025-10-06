// src/components/common/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  showButton?: boolean;
  buttonText?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  onSearch,
  icon,
  disabled = false,
  className = '',
  showButton = true,
  buttonText
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && !disabled) {
      onSearch();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch && !disabled) {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border-2 border-gray-300 rounded-lg 
          focus:outline-none focus:border-Primary-500 focus:ring-2 focus:ring-Primary-200 
          transition-all text-Text-Primary placeholder-gray-400
          ${icon ? 'pl-12' : ''}
          ${showButton ? 'pr-24' : 'pr-4'}
          ${disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : 'bg-white'}
        `}
      />
      
      {/* Icono de búsqueda */}
      {icon ? (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      ) : (
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )}
      
      {/* Botón de búsqueda */}
      {showButton && (
        <button
          type="submit"
          disabled={disabled}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2 
            px-4 py-1.5 rounded-md text-sm font-medium
            transition-all duration-200
            ${disabled 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-Primary-500 text-white hover:bg-Primary-700 active:scale-95'
            }
          `}
        >
          {buttonText || (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      )}
    </form>
  );
};

export default SearchBar;