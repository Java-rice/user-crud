// src/components/UserForm.js
import React, { useState } from 'react';
import { createUser, updateUser } from '../data';

function UserForm({ currentUser, setCurrentUser, refreshUsers }) {
  const [name, setName] = useState(currentUser ? currentUser.name : '');
  const [email, setEmail] = useState(currentUser ? currentUser.email : '');
  const [phone, setPhone] = useState(currentUser ? currentUser.phone : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, phone };

    try {
      if (currentUser) {
        await updateUser(currentUser.id, user);
      } else {
        await createUser(user);
      }
      refreshUsers();
      setCurrentUser(null);
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <button type="submit">{currentUser ? 'Update' : 'Add'} User</button>
    </form>
  );
}

export default UserForm;
