import React, { useEffect, useState } from 'react';

const UserModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: '',
      geo: {
        lat: '',
        lng: '',
      },
    },
    company: {
      name: '',
      catchPhrase: '',
      bs: '',
    },
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          suite: '',
          city: '',
          zipcode: '',
          geo: {
            lat: '',
            lng: '',
          },
        },
        company: {
          name: '',
          catchPhrase: '',
          bs: '',
        },
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-240 p-6 relative">
          <button className="absolute top-4 right-4 text-5xl text-[#FEAF00]" onClick={onClose}>&times;</button>
          <h2 className="text-lg font-bold text-center mb-4">{user ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex mb-4">
              <label className="flex-1 mr-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </label>
              <label className="flex-1">
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </label>
            </div>
            <div className="flex mb-4">
              <label className="flex-1 mr-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </label>
              <label className="flex-1">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </label>
            </div>
            <label className="block mb-2">
              Website:
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </label>
            <div className="flex gap-2 mb-4">
                <label className="block mb-2">
                Street:
                <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                Suite:
                <input
                    type="text"
                    name="address.suite"
                    value={formData.address.suite}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                City:
                <input
                    type="text"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
            </div>
            <div className="flex gap-2 mb-4">
                <label className="block mb-2">
                Zip Code:
                <input
                    type="text"
                    name="address.zipcode"
                    value={formData.address.zipcode}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                Latitude:
                <input
                    type="text"
                    name="address.geo.lat"
                    value={formData.address.geo.lat}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                Longitude:
                <input
                    type="text"
                    name="address.geo.lng"
                    value={formData.address.geo.lng}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
            </div>
            <div className="flex gap-2 mb-4">
                <label className="block mb-2">
                Company Name:
                <input
                    type="text"
                    name="company.name"
                    value={formData.company.name}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                Catch Phrase:
                <input
                    type="text"
                    name="company.catchPhrase"
                    value={formData.company.catchPhrase}
                    onChange={handleChange}
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
                <label className="block mb-2">
                Business Slogan:
                <input
                    type="text"
                    name="company.bs"
                    value={formData.company.bs}
                    onChange={handleChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                </label>
            </div>
            <button
              type="submit"
              className="mt-4 w-full bg-[#FEAF00] text-[#010101] rounded-md py-2 hover:bg-yellow-600 hover:text-white transition"
            >
              {user ? 'Update User' : 'Add User'}
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UserModal;
