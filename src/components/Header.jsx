import React, { useState } from 'react';
import { FaUserCircle, FaBell, FaSearch } from 'react-icons/fa';
import reback from '../assets/return.png';
import bell from '../assets/bell.png';
import search from '../assets/search.png';

const Header = ({ isExpanded, toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-2 w-full">
      <div className="flex items-center justify-between px-4">
        {/* Left Icon (Profile) */}
        <div className="flex items-center cursor-pointer" onClick={toggleSidebar}>
          <img src={reback} alt="Return" />
        </div>

        {/* Search Bar */}
        <div className="flex max-w-md gap-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-70 py-2 pl-4 pr-10 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />
            <img src={search} className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          {/* Right Icon (Notification) */}
          <div className="flex items-center">
            <img src={bell} alt="Notifications" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
