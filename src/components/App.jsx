import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/Loader/Loader';
import Button from '../components/Button/Button';
import Modal from '../components/Modal/Modal';
import styles from '../components/SearchBar/SearchBar.module.css';

const API_KEY = '36230432-188f02e7fd3eb7806444db018';
const BASE_URL = 'https://pixabay.com/api/';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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

  const [currentPage, setCurrentPage] = useState(1);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}?q=${searchQuery}&page=${
          currentPage + 1
        }&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      setImages(prevImages => [...prevImages, ...data.hits]);
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching more images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = largeImageURL => {
    setModalImage(largeImageURL);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div>
      <div className={styles.searchbarWrapper}>
        <SearchBar onSubmit={handleSearch} />
      </div>
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}
      {isModalOpen && (
        <Modal
          imageUrl={modalImage}
          onClose={closeModal}
          onOverlayClick={handleOverlayClick}
        />
      )}
    </div>
  );
};

export default App;
