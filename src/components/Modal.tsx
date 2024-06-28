import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          {/* Content */}
          <div className="relative bg-gray-800 rounded-lg shadow-lg outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-700 rounded-t">
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <button
                className="text-white close-modal"
                onClick={onClose}
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">{children}</div>
          </div>
        </div>
      </div>
      {/* Overlay */}
      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </>
  );
};

export default Modal;
