import React, { useState, useEffect } from 'react';

const UserForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: ''
  });

  // Load initial data into form when editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Handle input changes for fields that are not nested
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle input changes for nested fields (like address)
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address, // Keep the other address fields
        [name]: value, // Update the specific nested field
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass the updated data to the parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        value={formData.name} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        value={formData.email} 
        onChange={handleChange} 
        required 
      />
      <input 
        type="text" 
        name="phone" 
        placeholder="Phone" 
        value={formData.phone} 
        onChange={handleChange} 
        required 
      />

      {/* Address fields */}
      <input 
        type="text" 
        name="street" 
        placeholder="Street" 
        value={formData.address.street} 
        onChange={handleAddressChange} 
        required 
      />
      <input 
        type="text" 
        name="city" 
        placeholder="City" 
        value={formData.address.city} 
        onChange={handleAddressChange} 
        required 
      />

      <input 
        type="text" 
        name="company" 
        placeholder="Company Name (optional)" 
        value={formData.company.name} 
        onChange={(e) => setFormData({ 
          ...formData, 
          company: { name: e.target.value } 
        })} 
      />
      <input 
        type="url" 
        name="website" 
        placeholder="Website (optional)" 
        value={formData.website} 
        onChange={handleChange} 
      />
      
      <button type="submit">Save changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
      
    </form>
  );
};

export default UserForm;
