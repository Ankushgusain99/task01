import React, { useState } from 'react'; // Import useState here

const EditForm = ({ user, onSubmit }) => {
  const [name, setName] = useState(user.name); // Pre-populate name
  const [email, setEmail] = useState(user.email); // Pre-populate email

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUser = { ...user, name, email }; // Update user object
    onSubmit(updatedUser); // Pass updated user data to parent component
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={handleChange} />
      <input type="email" name="email" value={email} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
};

export default EditForm;
