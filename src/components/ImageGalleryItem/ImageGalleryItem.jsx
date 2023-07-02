import React from 'react';

export const ImageGalleryItem = ({ imageUrl, tags, onClick }) => {
  return (
    <li>
      <img src={imageUrl} alt={tags} onClick={onClick} />
    </li>
  );
};

export default ImageGalleryItem;
