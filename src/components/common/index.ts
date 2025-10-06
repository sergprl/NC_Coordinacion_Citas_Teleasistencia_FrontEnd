// src/components/common/index.ts
// Exportación centralizada de todos los componentes comunes

// Componentes básicos
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Input } from './Input';

// Componentes de interfaz
export { default as Badge } from './Badge';
export { default as Modal, ConfirmModal } from './Modal';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as Alert } from './Alert';

// Componentes de búsqueda y filtros
export { default as SearchBar } from './SearchBar';
export { default as FilterDropdown } from './FilterDropdown';

// Componentes específicos
export { default as DoctorCard } from './DoctorCard';

// Re-exportar tipos si es necesario
export type { default as ButtonProps } from './Button';
export type { default as CardProps } from './Card';
export type { default as InputProps } from './Input';