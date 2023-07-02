import React from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onImageClick }) => {
  console.log(images);
  return (
    <ul className="gallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageUrl={image.webformatURL}
          tags={image.tags}
          onClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
