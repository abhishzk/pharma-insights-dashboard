import React, { useState } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  keyField: keyof T;
}

function DataTable<T>({
  data,
  columns,
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  keyField,
}: DataTableProps<T>) {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (accessor: keyof T | ((row: T) => React.ReactNode)) => {
    if (typeof accessor === 'function') return;
    
    if (sortBy === accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(accessor);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === bValue) return 0;
      
      const compareResult = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? compareResult : -compareResult;
    });
  }, [data, sortBy, sortDirection]);

  if (isLoading) {
    return (
      <div className="bg-white overflow-hidden rounded-lg shadow-md animate-pulse">
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        </div>
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="px-6 py-3 flex space-x-4">
              {columns.map((column, index) => (
                <div key={index} className={`h-4 bg-gray-300 rounded ${column.width || 'flex-1'}`}></div>
              ))}
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, rowIndex) => (
              <div key={rowIndex} className="px-6 py-4 flex space-x-4">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className={`h-4 bg-gray-200 rounded ${column.width || 'flex-1'}`}></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-white overflow-hidden rounded-lg shadow-md">
        <div className="p-6 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden rounded-lg shadow-md">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    typeof column.accessor === 'string' ? 'cursor-pointer hover:bg-gray-100' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => {
                    if (typeof column.accessor === 'string') {
                      handleSort(column.accessor);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {column.header}
                    {typeof column.accessor === 'string' && sortBy === column.accessor && (
                      <span className="ml-2">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row) => (
              <tr
                key={String(row[keyField])}
                className={onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((column, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : row[column.accessor] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;