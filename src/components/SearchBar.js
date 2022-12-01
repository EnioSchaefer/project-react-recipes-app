import React from 'react';

export default function SearchBar() {
  return (
    <div>
      ingredient
      <input
        type="radio"
        name="search"
        id="ingredient"
        value="ingredient"
        data-testid="ingredient-search-radio"
      />
      name
      <input
        type="radio"
        name="search"
        id="name"
        value="name"
        data-testid="name-search-radio"
      />
      first letter
      <input
        type="radio"
        name="search"
        id="first-letter"
        value="first-letter"
        data-testid="first-letter-search-radio"
      />
      <button
        type="button"
        id="ingredient"
        value="ingredient"
        data-testid="exec-search-btn"
      >
        search
      </button>
    </div>
  );
}
