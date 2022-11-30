import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import searchIconSVG from '../images/searchIcon.svg';
import profileIconSVG from '../images/profileIcon.svg';

export default function Header({ title, showSearch }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const toProfile = () => {
    history.push('/profile');
  };

  const showAndHideInput = () => {
    if (showInput === false) {
      setShowInput(true);
    } if (showInput === true) {
      setShowInput(false);
    }
  };

  return (
    <div>
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
      {showInput && (
        <input
          data-testid="search-input"
          type="text"
        />
      )}
      {showSearch && (
        <button
          type="button"
          onClick={ showAndHideInput }
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
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};
