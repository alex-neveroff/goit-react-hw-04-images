import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix';
import { Container } from './App.styled';
import { getImagesByName, getPerPage } from 'api/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowLoadMore, setIsShowLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const listItemRef = useRef(null);

  useEffect(() => {
    if (query) {
      const getGallery = async () => {
        try {
          setIsLoading(true);

          const { hits, totalHits } = await getImagesByName(query, currentPage);
          if (currentPage === 1) {
            if (totalHits === 0) {
              Notify.warning(`Found nothing for "${query}"`);
            } else if (totalHits === 1) {
              Notify.success(`Found only one image for "${query}"`);
            } else {
              Notify.success(`Found ${totalHits} images for "${query}"`);
            }
          }

          setImages(prevImages => [...prevImages, ...hits]);
          showLoadMoreButton(totalHits, hits.length);
        } catch (error) {
          Notify.failure(error.message);
        } finally {
          setIsLoading(false);
        }
      };
      const showLoadMoreButton = (totalHits, hitsLength) => {
        const perPage = getPerPage();
        const totalPages = Math.ceil(totalHits / perPage);
        if (totalPages === currentPage && currentPage !== 1) {
          Notify.success(`This is the last page for "${query}"`);
        }
        if (!hitsLength || totalPages === currentPage) {
          setIsShowLoadMore(false);
          return;
        }
        setIsShowLoadMore(true);
      };

      getGallery();
    }
  }, [query, currentPage]);

  const handleSubmit = inputQuery => {
    if (inputQuery.toLowerCase() === query.toLowerCase()) {
      Notify.warning(`You are already viewing images for "${query}" `);
      return;
    }

    setImages([]);
    setCurrentPage(1);
    setQuery(inputQuery);
  };

  useEffect(() => {
    const listItemElement = listItemRef.current;
    const ulElement = document.querySelector('ul');
    const ulStyles = window.getComputedStyle(ulElement);
    const gap = Number.parseInt(ulStyles.getPropertyValue('gap'));

    if (listItemElement) {
      const listItemHeight = listItemElement.getBoundingClientRect().height;
      if (currentPage > 1) {
        window.scrollBy({
          top: (listItemHeight - gap) * 2,
          behavior: 'smooth',
        });
      }
    }
  });

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />

      {images && <ImageGallery images={images} listItemRef={listItemRef} />}
      {isLoading && <Loader />}
      {isShowLoadMore && !isLoading && (
        <Button
          onClick={() => {
            setCurrentPage(prevPage => prevPage + 1);
          }}
        />
      )}
    </Container>
  );
};

export default App;
