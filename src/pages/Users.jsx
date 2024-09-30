import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../data'; // Import CRUD functions
import UserModal from '../components/UserModal'; // Assuming UserModal component exists for editing/adding users
import sortIcon from '../assets/sort.png';
import trashIcon from '../assets/trash.png';
import editIcon from '../assets/pen.png';
import samplePicture from '../assets/sample-user.png'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


function User() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const usersPerPage = 7;

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Error fetching users!');
    }
  };

  // Delete a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id)); // Update local state
      toast.success('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting user!');
    }
  };

  // Edit user (open modal with user data)
  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Add new user (open modal with no data)
  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  // Handle modal form submission (create or update user)
  const handleModalSubmit = async (userData) => {
    try {
      if (selectedUser) {
        // Update user
        const response = await updateUser(selectedUser.id, userData);
        setUsers(users.map((user) => (user.id === selectedUser.id ? response.data : user)));
        toast.success('User updated successfully!');
      } else {
        // Create user
        const response = await createUser(userData);
        setUsers([...users, response.data]); // Add new user to local state
        toast.success('User created successfully!');
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Error saving user!');
    }
  };

  // Sort users by name
  const handleSort = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedUsers = [...users].sort((a, b) =>
      newSortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setUsers(sortedUsers);
  };

  // Pagination logic
  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="user-list p-6 font-montserrat">
      <div className="flex justify-between mb-3">
        <h1 className="font-bold text-xl">Users List</h1>
        <ToastContainer />
        <div className="flex gap-6">
          <button onClick={handleSort} className="flex items-center">
            <img src={sortIcon} alt="Sort" className="mr-1" />
          </button>
          <button className="bg-[#FEAF00] text-white px-8 py-2 rounded-sm" onClick={handleAddUser}>
            ADD NEW USER
          </button>
        </div>
      </div>
      <hr />
      <table className="min-w-full">
      <thead>
        <tr className='text-xs text-gray-500' style={{ height: '40px', textAlign: 'left' }}>
          <th style={{ width: 'auto', padding: '0' }}></th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Company</th>
          <th style={{ width: 'auto', padding: '0' }}></th>
        </tr>
      </thead>
      <tbody className="text-xs font-montserrat" style={{ height: '40px', textAlign: 'left' }}>
        {currentUsers.map((user, index) => (
          <tr key={user.id} 
              className={`${
                index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
              }`} 
              style={{ height: '70px' }} 
          >
            <td className="py-3">
              <img src={samplePicture} alt="User" className="w-12 h-12 rounded-md" />
            </td>
            <td className="py-3">{user.name}</td>
            <td className="py-3">{user.email}</td>
            <td className="py-3">{user.phone}</td>
            <td className="py-3">{`${user.address.street}, ${user.address.city}`}</td>
            <td className="py-3">{user.company.name}</td>
            <td className="flex flex-row gap-2 mt-5 justify-center items-center w-[100%]">
              <button onClick={() => handleEditUser(user)}>
                <img src={editIcon} alt="Edit" />
              </button>
              <button onClick={() => handleDeleteUser(user.id)} className='w-[100%]'>
                <img src={trashIcon} alt="Delete" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      </table>

      {/* Pagination controls */}
      <div className="flex justify-end mt-4">
        {/* Left Arrow Button */}
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          className={`mx-1 px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-gray-300 text-black'}`}
          disabled={currentPage === 1} // Disable when on the first page
        >
          &lt;
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded-md font-bold ${currentPage === index + 1 ? 'border border-[#FEAF00] bg-white text-[#FEAF00]' : 'bg-white border border-gray-500 text-gray-500'}`}
          >
            {index + 1}
          </button>
        ))}

        {/* Right Arrow Button */}
        <button
          onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
          className={`mx-1 px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-gray-300 text-black'}`}
          disabled={currentPage === totalPages} // Disable when on the last page
        >
          &gt; 
        </button>
      </div>

      {/* User Modal for add/edit */}
      {isModalOpen && (
        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleModalSubmit}
          user={selectedUser}
        />
      )}
    </div>
  );
}

export default User;
