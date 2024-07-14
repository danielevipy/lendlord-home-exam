import React, { useState } from 'react';
import '../UserTable/user_table.css';

const UserTable = ({ users, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({
    key: 'firstName',
    direction: 'ascending',
  });
  const [filterConfig, setFilterConfig] = useState('');

  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter((user) => {
    return (
      user.firstName.toLowerCase().includes(filterConfig.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filterConfig.toLowerCase()) ||
      user.email.toLowerCase().includes(filterConfig.toLowerCase())
    );
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter users..."
        value={filterConfig}
        onChange={(e) => setFilterConfig(e.target.value)}
        className="filter-input"
      />
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('firstName')}>First Name</th>
            <th onClick={() => requestSort('lastName')}>Last Name</th>
            <th onClick={() => requestSort('email')}>Email</th>
            <th onClick={() => requestSort('dateStarted')}>Date Started</th>
            <th onClick={() => requestSort('salary')}>Salary</th>
            <th onClick={() => requestSort('role')}>Role</th>
            <th>Manager</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
              <td>{user.salary}</td>
              <td>{user.role}</td>
              <td>
                {user.manager
                  ? `${user.manager.firstName} ${user.manager.lastName}`
                  : 'N/A'}
              </td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
