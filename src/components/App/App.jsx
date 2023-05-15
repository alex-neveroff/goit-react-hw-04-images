import React, { Component, createRef } from 'react';
import { Notify } from 'notiflix';
import { Container } from './App.styled';
import { getImagesByName, getPerPage } from 'api/api';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';
import Modal from 'components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    showModal: false,
    showLoadMore: false,
    largeImage: '',
    alt: '',
    isLoading: false,
    imageHeight: 0,
  };

  imageGalleryRef = createRef();

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query.toLowerCase() !== this.state.query.toLowerCase()) {
      this.getGallery();
    }
    if (prevState.page < this.state.page) {
      this.getGallery();
    }
  }

  getGallery = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ isLoading: true });
      const { hits, totalHits } = await getImagesByName(query, page);
      if (page === 1) {
        if (totalHits === 0) {
          Notify.warning(`Found nothing for "${query}"`);
        } else if (totalHits === 1) {
          Notify.success(`Found only one image for "${query}"`);
        } else {
          Notify.success(`Found ${totalHits} images for "${query}"`);
        }
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
      }));
      this.showLoadMoreButton(totalHits, hits.length);
    } catch (error) {
      Notify.failure(error.message);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    if (query.toLowerCase() === this.state.query.toLowerCase()) {
      Notify.warning(`You are already viewing images for "${query}" `);
      return;
    }
    this.setState({
      query: query,
      page: 1,
      images: [],
    });
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ largeImage: largeImageURL, alt: tags, isLoading: true });

    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  showLoadMoreButton = (totalHits, hitsLength) => {
    const perPage = getPerPage();
    const Currentpage = this.state.page;
    const totalPages = Math.ceil(totalHits / perPage);
    if (!hitsLength || totalPages === Currentpage) {
      this.setState({ showLoadMore: false });
      return;
    }

    this.setState({ showLoadMore: true });
  };

  imageLoaded = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { images, largeImage, alt, showModal, showLoadMore, isLoading } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handleSubmit} />
        {images && (
          <ImageGallery images={images} onClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}

        {showLoadMore && !isLoading && <Button onClick={this.loadMore} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            {isLoading && <Loader />}
            <img
              className="modal-content"
              src={largeImage}
              alt={alt}
              onLoad={this.imageLoaded}
            />
          </Modal>
        )}
      </Container>
    );
  }
}

export default App;
