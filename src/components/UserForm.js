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

  const [errors, setErrors] = useState({}); // To store validation errors

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

  // Simple URL validation function
  const validateURL = (url) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
  };

  // Validation function
  const validateForm = () => {
    let errors = {};

    // Name validation: Required, minimum 3 characters
    if (!formData.name || formData.name.length < 3) {
      errors.name = 'Name is required and must be at least 3 characters long.';
    }

    // Username validation: Required, should be auto-filled
    if (!formData.username || formData.username.length < 3) {
      errors.username = 'Username is required and must be at least 3 characters long.';
    }

    // Company name validation: Optional, but must be at least 3 characters if provided
    if (formData.company.name && formData.company.name.length < 3) {
      errors.company = 'Company name must be at least 3 characters long.';
    }

    // Website validation: Optional, but must be a valid URL if provided
    if (formData.website && !validateURL(formData.website)) {
      errors.website = 'Please enter a valid website URL.';
    }

    setErrors(errors); // Set the errors state

    // If no errors, return true
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Run validation before submitting
    if (validateForm()) {
      onSubmit(formData); // If valid, submit the form
    }
  };

  // Set default value for username on create and make it non-editable
  useEffect(() => {
    if (!initialData) {
      setFormData({
        ...formData,
        username: `USER-${formData.name.toLowerCase().replace(/ /g, '-')}`, // Set the auto-filled username
      });
    }
  }, [formData.name, initialData]);

  return (
    <form onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      {/* Email Field */}
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
      </div>

      {/* Phone Field */}
      <div>
        <label>Phone:</label>
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
        />
      </div>

      {/* Username Field (Auto-filled and non-editable) */}
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          value={formData.username} 
          readOnly // Non-editable field
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>

      {/* Address Fields */}
      <div>
        <label>Street:</label>
        <input 
          type="text" 
          name="street" 
          placeholder="Street" 
          value={formData.address.street} 
          onChange={handleAddressChange} 
          required 
        />
      </div>
      <div>
        <label>City:</label>
        <input 
          type="text" 
          name="city" 
          placeholder="City" 
          value={formData.address.city} 
          onChange={handleAddressChange} 
          required 
        />
      </div>

      {/* Company Name Field (Optional) */}
      <div>
        <label>Company Name (Optional):</label>
        <input 
          type="text" 
          name="company" 
          placeholder="Company Name" 
          value={formData.company.name} 
          onChange={(e) => setFormData({ 
            ...formData, 
            company: { name: e.target.value } 
          })} 
        />
        {errors.company && <span className="error">{errors.company}</span>}
      </div>

      {/* Website Field (Optional) */}
      <div>
        <label>Website (Optional):</label>
        <input 
          type="url" 
          name="website" 
          placeholder="Website" 
          value={formData.website} 
          onChange={handleChange} 
        />
        {errors.website && <span className="error">{errors.website}</span>}
      </div>
      
      {/* Submit and Cancel Buttons */}
      <button type="submit">Save Changes</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};

export default UserForm;
