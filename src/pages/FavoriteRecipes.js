import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import setLocalStorage from '../service/setLocalStorage';
import RecipeContext from '../context/RecipeContext';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareLink from '../service/shareLink';
import './FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [showCopyMessage, setShowCopyMessage] = useState([false, 0]);
  const [favRecipes, setFavRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const [filtered, setFiltered] = useState(null);
  const { isMeal } = useContext(RecipeContext);

  const updateFavorites = (recipe, isPrep) => {
    setLocalStorage(recipe, isMeal, isPrep);
    setFavRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  };

  const filterRecipes = (type) => {
    setFiltered(type === 'all'
      ? null : favRecipes.filter((recipe) => recipe.type === type));
  };

  if (!filtered && !favRecipes) {
    return (
      <div>
        <Header title="Favorite Recipes" showSearch={ false } />
        <p>Sem receitas favoritas :(</p>
      </div>
    );
  }

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
            <Link to={ `/${item.type}s/${item.id}` }>
              <img
                className="favorite-image"
                src={ item.image }
                alt={ `${item.name}` }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`}
            </p>
            <Link to={ `/${item.type}s/${item.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            </Link>
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
              onClick={ () => {
                shareLink(item.type, item.id); setShowCopyMessage([true, index]);
              } }
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="share button" />
            </button>
            {(showCopyMessage[0] && showCopyMessage[1] === index)
            && <span style={ { fontSize: '10px' } }>Link copied!</span>}
            <p data-testid={ `${index}-${item.tags}-horizontal-tag` }>{item.tags}</p>
          </div>
        ))
      }
    </div>
  );
}
