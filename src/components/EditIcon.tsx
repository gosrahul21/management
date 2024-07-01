import React from 'react';
import EditIconSvg from '../assets/icons/edit-icon.svg';

const EditIcon = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
      style={{ position: 'absolute', top: '10px', right: '10px' }}
    >
      <img src={EditIconSvg} alt="Edit Icon" className="w-6 h-6" />
    </div>
  );
};

export default EditIcon;
