import React from 'react';
import EditIconSvg from '../assets/icons/edit-icon.svg';

const EditIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
      // style={{ top: '10px', right: '10px' }}
    >
      <img src={EditIconSvg} alt="Edit Icon" className="z-0 w-6 h-6" />
    </div>
  );
};

export default EditIcon;
