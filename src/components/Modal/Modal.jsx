import React from 'react';
import styles from './Modal.module.css';

export const Modal = ({ imageUrl, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <img src={imageUrl} alt="" className="modal-image" />
      </div>
    </div>
  );
};

export default Modal;
