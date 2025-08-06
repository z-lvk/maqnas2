import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    // Backdrop
    <div 
      onClick={onClose} 
      className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
    >
      {/* Modal Content */}
      <div 
        onClick={(e) => e.stopPropagation()} // Prevents modal from closing when clicking inside
        className="relative bg-brand-dark-light rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full p-4"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 h-10 w-10 bg-maroon rounded-full text-white font-bold text-xl z-10"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;