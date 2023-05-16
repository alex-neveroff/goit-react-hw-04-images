import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { GalleryItem } from './ImageGalleryItem.styled';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';

const ImageGalleryItem = forwardRef(({ image }, ref) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { webformatURL, tags, largeImageURL } = image;

  return (
    <GalleryItem ref={ref}>
      <img
        className="galery-image"
        src={webformatURL}
        alt={tags}
        onClick={() => {
          setIsShowModal(true);
          setIsLoading(true);
        }}
      />
      {isShowModal && (
        <Modal onClose={() => setIsShowModal(false)}>
          {isLoading && <Loader />}
          <img
            className="modal-content"
            src={largeImageURL}
            alt={tags}
            onLoad={() => setIsLoading(false)}
          />
        </Modal>
      )}
    </GalleryItem>
  );
});
ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
