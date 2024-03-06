import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm'; // Assuming EditForm.jsx is in the same directory

const API_URL = 'https://api.mockaroo.com/api/4cbdd030?count=1000&key=aeb04030';

const DataTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(API_URL);
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (user) => {
    setIsEditing(true);
    setUserToEdit(user);
  };

  const handleFormSubmit = (updatedUser) => {
    // Implement logic to update user data (simulated update on mock API)
    console.log('Updated user:', updatedUser);

    // Update data state to reflect changes (assuming in-memory update)
    const updatedData = data.map((user) => (user.id === updatedUser.id ? updatedUser : user));
    setData(updatedData);

    setIsEditing(false); // Close edit form after submission
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={(e) => setSearchTerm(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>
                <button onClick={() => handleEditClick(user)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Form Modal (conditional rendering) */}
      {isEditing && userToEdit && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <EditForm user={userToEdit} onSubmit={handleFormSubmit} />
            <button onClick={() => setIsEditing(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
