import React from 'react';
import sample from '../assets/sample-user.png';

const UserImage = ({ isExpanded }) => {
  return (
    <div className="flex flex-col items-center mt-10 w-full">
      <img className="rounded-full mb-2" src={sample} width="80" height="80" alt="User" />
      {isExpanded && ( // Conditionally render the text only when expanded
        <div className="py-2 text-center">
          <h2 className="font-bold text-lg text-gray-800">Karthi Madesh</h2>
          <h3 className="text-[#FEAF00] text-sm font-medium">Admin</h3>
        </div>
      )}
    </div>
  );
};

export default UserImage;