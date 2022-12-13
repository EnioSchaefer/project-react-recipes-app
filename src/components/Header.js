import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import searchIconSVG from '../images/searchIcon.svg';
import profileIconSVG from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

export default function Header({ title, icon, showSearch }) {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  const toProfile = () => {
    history.push('/profile');
  };

  return (
    <header className="header">
      <div>
        <div className="header-button">
          <button
            type="button"
            onClick={ toProfile }
            variant="dark"
            className="header-button"
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
              className="search-button"
            >
              <img
                data-testid="search-top-btn"
                src={ searchIconSVG }
                alt="SVG search"
              />
            </button>
          )}
        </div>
        <div className="icon-title">
          {icon && (
            <img
              src={ icon }
              alt="SVG element"
            />
          )}
          <h1
            data-testid="page-title"
          >
            { title }
          </h1>
          {showInput && (
            <SearchBar />
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};
