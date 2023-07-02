import React from 'react';

export const Modal = ({ imageUrl, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="overlay" onClick={handleClose}>
      <div className="modal">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default Modal;
