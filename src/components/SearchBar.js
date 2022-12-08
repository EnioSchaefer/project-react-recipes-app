import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

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
    <div>
      <div>
        <input
          type="text"
          id="search"
          name="search"
          data-testid="search-input"
          value={ searchInput }
          onChange={ ({ target }) => { setSearchInput(target.value); } }
        />
      </div>
      ingredient
      <input
        type="radio"
        name="search"
        id="ingredient"
        value="ingredient"
        data-testid="ingredient-search-radio"
        onChange={ ({ target }) => { setRadio(target.value); } }
      />
      name
      <input
        type="radio"
        name="search"
        id="name"
        value="name"
        data-testid="name-search-radio"
        onChange={ ({ target }) => { setRadio(target.value); } }
      />
      first letter
      <input
        type="radio"
        name="search"
        id="first-letter"
        value="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ ({ target }) => { setRadio(target.value); } }
      />
      <div>
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
    </div>
  );
}
