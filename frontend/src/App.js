import React, { useState, useEffect } from 'react';
import './App.css';
import './index.css';
import GenericModal from './components/Modal/Modal';
import Header from './components/Header/header';
import UserTable from './components/UserTable/UserTable';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]);
  const [shown, setShown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const toggleModal = () => {
    setShown((prev) => !prev);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5005/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateUser = () => {
    setCurrentUser(null);
    toggleModal();
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    toggleModal();
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5005/user/${userId}`
      );
      if (response.status === 204) {
        fetchUsers();
      } else {
        console.error('Error deleting user:', response);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Header />
      <div className="container">
        <button className="add-user-btn" onClick={handleCreateUser}>
          Add User
        </button>
        <UserTable
          users={users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
        <GenericModal
          displayModal={shown}
          closeModal={toggleModal}
          user={currentUser}
          fetchUsers={fetchUsers}
        />
      </div>
    </div>
  );
}

export default App;
