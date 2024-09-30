import React from 'react';
import { NavLink } from 'react-router-dom';
import home from '../assets/home.png';
import course from '../assets/course.png';
import cap from '../assets/cap.png';
import payment from '../assets/payment.png';
import report from '../assets/report.png';
import settings from '../assets/settings.png';
import signout from '../assets/sign-out.png';
import UserImage from './UserImage';

const navItems = [
  { path: '/', label: 'Home', icon: home },
  { path: '/course', label: 'Course', icon: course },
  { path: '/users', label: 'Users', icon: cap },
  { path: '/payment', label: 'Payment', icon: payment },
  { path: '/report', label: 'Report', icon: report },
  { path: '/settings', label: 'Settings', icon: settings },
];

const Sidebar = ({ isExpanded }) => {
  return (
    <div
      className={`sidebar font-montserrat p-4 bg-[#F2EAE1] min-h-screen transition-all duration-300 
        ${isExpanded ? 'w-1/5' : 'w-20'} 
        md:${isExpanded ? 'w-1/5' : 'w-16'}`} // Adjust the width at medium screens
    >
      <h2 className={`border-l-4 px-4 border-[#FEAF00] font-bold text-lg ${isExpanded ? 'block' : 'hidden'}`}>
        CRUD OPERATIONS
      </h2>
      <UserImage isExpanded={isExpanded} />

      <ul className="mt-5 space-y-2">
        {navItems.map(({ path, label, icon }) => (
          <li key={label}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                isActive
                  ? 'active flex items-center text-sm bg-[#FEAF00] rounded-md px-4 py-2 transition'
                  : 'flex items-center text-black text-sm hover:bg-[#FEAF00] hover:rounded-md px-4 py-2 transition'
              }
            >
              <img src={icon} alt={label} className={`transition-all duration-300 ${isExpanded ? 'h-4 ml-16' : 'w-4 h-4'} mr-2`} />
              {/* Show label only if expanded or if screen size is small */}
              <span className={`transition-all duration-300 ${isExpanded || window.innerWidth < 768 ? '' : 'hidden'}`}>
                {label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className={`mt-20 ${isExpanded ? 'px-4' : 'px-0' }`}>
        <button className={`w-full flex items-center ${isExpanded ? 'justify-center' : 'justify-start' } text-black text-sm rounded-md p-2 hover:bg-[#FEAF00] transition`}>
          {isExpanded && 'Logout'}
          <img src={signout} alt="sign out" className={`transition-all duration-300 ${isExpanded ? 'w-4 ml-2' : 'w-4 h-4 ml-0 mr-2'}`} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
