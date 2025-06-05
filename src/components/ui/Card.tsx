import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  isLoading = false,
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-card overflow-hidden transition-shadow duration-300 hover:shadow-card-hover ${className}`}>
      {isLoading ? (
        <div className="p-6 animate-pulse">
          {title && <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>}
          {subtitle && <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      ) : (
        <>
          {(title || subtitle) && (
            <div className="p-6 pb-0">
              {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
          )}
          <div className="p-6">{children}</div>
          {footer && <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">{footer}</div>}
        </>
      )}
    </div>
  );
};

export default Card;