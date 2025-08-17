import React, { useState, useEffect } from 'react';

interface Column<T extends Record<string, any>> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
  responsive?: 'sm' | 'md' | 'lg' | 'xl'; // Responsive visibility control
}

interface DataTableProps<T extends Record<string, any>> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl'; // Global responsive breakpoint
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className = '',
  breakpoint = 'md',
}: DataTableProps<T>) {
  const [sortedData, setSortedData] = useState<T[]>(data);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setSortedData(data);
    
    // Check for mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [data]);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (aValue == null) return direction === 'ascending' ? -1 : 1;
      if (bValue == null) return direction === 'ascending' ? 1 : -1;
      if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
      if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
  };

  const handleRowSelect = (row: T) => {
    const newSelectedRows = selectedRows.includes(row)
      ? selectedRows.filter(selectedRow => selectedRow !== row)
      : [...selectedRows, row];
    
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    const allSelected = selectedRows.length === data.length;
    const newSelectedRows = allSelected ? [] : [...data];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Filter columns based on responsive breakpoints
  const visibleColumns = isMobile 
    ? columns.filter(col => !col.responsive || col.responsive === 'sm')
    : columns;

  return (
    <div className={`w-full overflow-x-auto rounded-lg shadow ${className}`}>
      {isMobile && (
        <div className="md:hidden p-2 text-sm text-gray-500">
          Scroll horizontally to view all columns
        </div>
      )}
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            {selectable && (
              <th className="px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={selectedRows.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  disabled={loading || data.length === 0}
                  aria-label="Select all rows"
                />
              </th>
            )}
            {visibleColumns.map(column => (
              <th
                key={column.key}
                className={`px-2 md:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                } ${
                  column.responsive ? `hidden ${column.responsive}:table-cell` : ''
                }`}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center">
                  <span className="truncate max-w-[100px] md:max-w-none">
                    {column.title}
                  </span>
                  {column.sortable && (
                    <span className="ml-1">
                      {sortConfig?.key === column.key ? (
                        sortConfig.direction === 'ascending' ? (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )
                      ) : (
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="px-4 py-20 text-center">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Loading data...</p>
                </div>
              </td>
            </tr>
          ) : sortedData.length === 0 ? (
            <tr>
              <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="px-4 py-20 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`hover:bg-gray-50 ${
                  selectedRows.includes(row) ? 'bg-blue-50' : ''
                }`}
              >
                {selectable && (
                  <td className="px-2 md:px-4 py-3 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelect(row)}
                      aria-label={`Select row ${rowIndex + 1}`}
                    />
                  </td>
                )}
                {visibleColumns.map(column => (
                  <td 
                    key={column.key} 
                    className={`px-2 md:px-4 py-3 text-sm text-gray-700 ${
                      column.responsive ? `hidden ${column.responsive}:table-cell` : ''
                    }`}
                  >
                    <div className="truncate max-w-[120px] md:max-w-none">
                      {column.render
                        ? column.render(row[column.dataIndex], row)
                        : String(row[column.dataIndex])}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}