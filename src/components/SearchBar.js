import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import './SearchBar.css';

export default function SearchBar() {
  const history = useHistory();
  const {
    setSearchBy, searchInput, setSearchInput, radio, setRadio, setPath,
  } = useContext(RecipeContext);

  const handleButtonSearch = async () => {
    setPath(history.location.pathname);
    setSearchBy({
      search: searchInput,
      type: radio,
    });
  };

  return (
    <main className="search-bar">
      <div className="purple-container" />
      <div>
        <input
          type="text"
          placeholder="Search"
          id="search"
          name="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
          className="text-input"
        />
      </div>
      <div className="radio-input">
        <label htmlFor="radio-input">
          <input
            type="radio"
            name="search"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ ({ target }) => { setRadio(target.value); } }
          />
          Ingridient
        </label>
        <label htmlFor="radio-input">
          <input
            type="radio"
            name="search"
            value="name"
            data-testid="name-search-radio"
            onChange={ ({ target }) => { setRadio(target.value); } }
          />
          Name
        </label>
        <label htmlFor="radio-input">
          <input
            type="radio"
            name="search"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ ({ target }) => { setRadio(target.value); } }
            className="radio-input"
          />
          First letter
        </label>
      </div>
      <div className="last-div">
        <button
          type="button"
          id="ingredient"
          value="ingredient"
          data-testid="exec-search-btn"
          onClick={ handleButtonSearch }
        >
          search
        </button>
      </div>
    </main>
  );
}
