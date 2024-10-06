import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleCreateOrUpdateUser = (userData) => {
    if (userData.id) {
      // Update user
      axios.put(`https://jsonplaceholder.typicode.com/users/${userData.id}`, userData)
        .then(response => {
          setUsers(users.map(user => user.id === userData.id ? response.data : user));
        });
    } else {
      // Create user
      axios.post('https://jsonplaceholder.typicode.com/users', userData)
        .then(response => {
          setUsers([...users, response.data]);
        });
    }
    setModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => {
        setUsers(users.filter(user => user.id !== id));
      });
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <button onClick={() => { setSelectedUser(null); setModalOpen(true); }}>Create User</button>
      <UserTable users={users} onEdit={setSelectedUser} onDelete={handleDeleteUser} />

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <UserForm 
          initialData={selectedUser}
          onSubmit={handleCreateOrUpdateUser}
        />
      </Modal>

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default HomePage;
