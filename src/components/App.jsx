import React, { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';

const API_KEY = '36230432-188f02e7fd3eb7806444db018';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const fetchImages = async query => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?q=${query}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(data.hits);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = query => {
    setImages([]);
    setSearchQuery(query);
    fetchImages(query);
  };

  const handleLoadMore = () => {
    fetchImages(searchQuery);
  };

  const openModal = imageUrl => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {modalImage && <Modal imageUrl={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
