import React, { useEffect, useState } from 'react';
import sort from '../assets/sort.png';
import samplePicture from '../assets/sample-user.png'; 
import trash from '../assets/trash.png';
import pen from '../assets/pen.png';
import { getUsers, deleteUser, createUser, updateUser } from '../data';
import UserModal from '../components/UserModal'; // Import the modal component

function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order
  const usersPerPage = 7;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (userData) => {
    try {
      if (selectedUser) {
        // Update user
        await updateUser(selectedUser.id, userData);
        setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...userData } : user)));
      } else {
        // Create user
        const response = await createUser(userData);
        setUsers([...users, response.data]);
      }
    } catch (error) {
      console.error('Error saving user', error);
    }
  };

  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) => {
      if (newSortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setUsers(sortedUsers);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="user-list p-6 font-montserrat">
      <div className='flex mb-3 flex-row justify-between'>
        <h1 className='font-bold text-xl'>Users List</h1>
        <div className='flex justify-center gap-6 align-middle'>
          <button onClick={handleSort} className="flex items-center">
            <img src={sort} alt="Sort" className="mr-1" />
          </button>
          <button className="text-white text-sm bg-[#FEAF00] rounded-sm px-8 py-2 transition" onClick={handleAddUser}>ADD NEW USER</button>
        </div>
      </div>
      <hr />
      <table className="mt-3 min-w-full">
        <thead>
          <tr>
            <th style={{ width: 'auto', padding: '0' }}></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='font-montserrat text-sm'>
          {currentUsers.map(user => (
            <tr key={user.id}>
              <td>
                <img src={samplePicture} alt="User" className="w-12 h-12 rounded-md" />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
              <td>{user.company.name}</td>
              <td className='flex flex-row align-middle justify-center gap-2'>
                <button onClick={() => handleEditUser(user)}><img src={pen} alt="Edit" /></button>
                <button onClick={() => handleDeleteUser(user.id)}><img src={trash} alt="Delete" /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-[#FEAF00] text-white' : 'bg-gray-300 text-black'} transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        user={selectedUser}
      />
    </div>
  );
}

export default User;
