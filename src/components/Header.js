import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import searchIconSVG from '../images/searchIcon.svg';
import profileIconSVG from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, showSearch }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const toProfile = () => {
    history.push('/profile');
  };

  return (
    <div>
      <header>
        <button
          type="button"
          onClick={ toProfile }
        >
          <img
            data-testid="profile-top-btn"
            src={ profileIconSVG }
            alt="SVG profile"
          />
        </button>
        {showSearch && (
          <button
            type="button"
            onClick={ () => setShowInput(!showInput) }
            data-testid="search-button"
          >
            <img
              data-testid="search-top-btn"
              src={ searchIconSVG }
              alt="SVG search"
            />
          </button>
        )}
        <h1
          data-testid="page-title"
        >
          { title }
        </h1>
        {showInput && (
          <SearchBar />
        )}
      </header>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};