import React, { useState } from 'react';
import { InputField } from './InputField/InputField';
import { DataTable } from './DataTable/DataTable';
// import { InputField } from './InputField';
// import { DataTable } from './DataTable';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

const DemoPage = () => {
  // State for input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  // Mock user data
  const mockUsers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Manager', status: 'active', joinDate: '2023-04-05' },
  ];

  // Filter users based on search term
  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns configuration - properly typed with Column<User>
  const columns = [
    { 
      key: 'name', 
      title: 'Name', 
      dataIndex: 'name' as const, // Mark as const to ensure it's treated as literal type
      sortable: true 
    },
    { 
      key: 'email', 
      title: 'Email', 
      dataIndex: 'email' as const,
      sortable: true 
    },
    { 
      key: 'role', 
      title: 'Role', 
      dataIndex: 'role' as const,
      sortable: true 
    },
    { 
      key: 'status', 
      title: 'Status', 
      dataIndex: 'status' as const,
      render: (value: 'active' | 'inactive') => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { 
      key: 'joinDate', 
      title: 'Join Date', 
      dataIndex: 'joinDate' as const,
      sortable: true 
    },
  ] satisfies Column<User>[]; // Ensure it satisfies the Column<User> type

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Management Dashboard</h1>
        
        {/* Search Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="w-full md:w-64">
            <InputField
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="medium"
              clearable
            />
          </div>
        </div>

        {/* DataTable Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <DataTable<User>
            data={filteredUsers}
            columns={columns}
            selectable
            onRowSelect={setSelectedRows}
          />

          {selectedRows.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-blue-800">
                {selectedRows.length} user{selectedRows.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoPage;