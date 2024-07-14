import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import '../Modal/modal.css';

function GenericModal({ closeModal, displayModal, id, user, fetchUsers }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '',
    salary: '',
    role: 'Worker',
  });

  useEffect(() => {
    console.log(user);
    if (user && displayModal) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateStarted: new Date(user.dateStarted).toISOString().substring(0, 10),
        salary: user.salary,
        role: user.role,
      });
    } else if (!user && displayModal) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '',
        salary: '',
        role: 'Worker',
      });
    }
  }, [user, displayModal]);

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [handleKeyUp]);

  const clickedOutside = () => {
    closeModal();
  };

  const divStyle = {
    display: displayModal ? 'block' : 'none',
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user) {
        await axios.put(`http://localhost:5005/user/${user._id}`, formData);
      } else {
        await axios.post('http://localhost:5005/user', formData);
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div
      className="basic-modal"
      id={id}
      onClick={clickedOutside}
      style={divStyle}
    >
      <div className="basic-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={closeModal}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date Started:
            <input
              type="date"
              name="dateStarted"
              value={formData.dateStarted}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Salary:
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Role:
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Manager">Manager</option>
              <option value="Worker">Worker</option>
              <option value="Driver">Driver</option>
            </select>
          </label>
          <button type="submit">{user ? 'Update' : 'Create'}</button>
        </form>
      </div>
    </div>
  );
}

export default GenericModal;
