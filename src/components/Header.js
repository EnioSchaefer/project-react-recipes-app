import { PropTypes } from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIconSVG from '../images/searchIcon.svg';
import profileIconSVG from '../images/profileIcon.svg';

export default function Header({ title, showSearch }) {
  const history = useHistory();

  const toProfile = () => {
    history.push('/profile');
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
      {showSearch && (
        <button
          type="button"
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
