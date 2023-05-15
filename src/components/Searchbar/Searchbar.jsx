import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
import { SearchbarForm, SearchbarHeader } from './Searchbar.styled';

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSearch = event => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query === '') {
      Notify.warning(`Enter something`);
      return;
    }
    onSubmit(query);
  };

  return (
    <SearchbarHeader>
      <SearchbarForm onSubmit={handleSubmit}>
        <button type="submit" className="searchbar-button">
          <SearchIcon width="35" height="35" />
        </button>

        <input
          className="searchbar-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleSearch}
        />
      </SearchbarForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
