import React from 'react';

export const Button = ({ onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;
