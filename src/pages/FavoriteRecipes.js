import React, { useContext, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import setLocalStorage from '../service/setLocalStorage';
import RecipeContext from '../context/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [favRecipes, setFavRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const [filtered, setFiltered] = useState(null);
  const { isMeal } = useContext(RecipeContext);

  const shareLink = (type, id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowCopyMessage(true);
    const fiveSeconds = 5000;
    setTimeout(() => {
      setShowCopyMessage(false);
    }, fiveSeconds);
  };

  const updateFavorites = (recipe, isPrep) => {
    setLocalStorage(recipe, isMeal, isPrep);
    setFavRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const filterRecipes = (type) => {
    setFiltered(type === 'all'
      ? null : favRecipes.filter((recipe) => recipe.type === type));
  };

  return (
    <div>
      <Header title="Favorite Recipes" showSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => filterRecipes('meal') }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterRecipes('all') }
      >
        All
      </button>
      {
        (filtered || favRecipes).map((item, index) => (
          <div key={ index }>
            <img src={ item.image } alt="" data-testid={ `${index}-horizontal-image` } />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            <button
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => {
                updateFavorites(item, true);
              } }
              src={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="unfavorite button" />
            </button>
            <button
              type="button"
              onClick={ () => shareLink(item.type, item.id) }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share button" />
            </button>
            {showCopyMessage && <span style={ { fontSize: '10px' } }>Link copied!</span>}
            <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>{item.tags}</p>
          </div>
        ))
      }
    </div>
  );
}
