// src/components/common/Card.tsx
import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`
      bg-Surface rounded-xl shadow-sm border border-gray-100
      ${paddings[padding]}
      ${hover ? 'hover:shadow-lg transition-shadow duration-300' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;