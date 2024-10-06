import React, { useState } from 'react';
import UserForm from './UserForm'; // Import the form component


const UserTable = ({ users, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false); // To toggle edit form
  const [selectedUser, setSelectedUser] = useState(null); // To store the selected user

  // Handle the edit button click
  const handleEditClick = (user) => {
    setSelectedUser(user); // Set the selected user
    setIsEditing(true); // Open the form for editing
  };

  // Close the edit form
  const handleFormClose = () => {
    setIsEditing(false);
    setSelectedUser(null); // Reset after editing
  };

  // Submit the edited data (this is passed to the UserForm component)
  const handleFormSubmit = (updatedUser) => {
    onEdit(updatedUser); // Call the parent onEdit function to update the user
    handleFormClose(); // Close the form after submission
  };

  return (
    <div className="table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Username</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'even' : 'odd'}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.username}</td>
              <td>{user.address.city}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(user)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Conditionally render the UserForm modal for editing */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit User</h2>
            <UserForm 
              initialData={selectedUser} // Pre-fill the form with the selected user data
              onSubmit={handleFormSubmit} // Handle form submission
              onClose={handleFormClose} // Close the form
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
