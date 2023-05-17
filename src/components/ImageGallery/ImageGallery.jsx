import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

const ImageGallery = ({ images, listItemRef }) => {
  return (
    <Gallery>
      {images.map((image, index) => (
        <ImageGalleryItem
          key={`${image.id}${index !== 0 ? 'www' + index : ''}`}
          image={image}
          ref={listItemRef}
        />
      ))}
    </Gallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  listItemRef: PropTypes.object.isRequired,
};

export default ImageGallery;
