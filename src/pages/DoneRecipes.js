import React, { useContext } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const { isMeal } = useContext(RecipeContext);
  const doneRecipesList = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  console.log(doneRecipesList[0].name);

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {
        doneRecipesList.map((item, index) => (
          <div key={ index }>
            <img src={ item.image } alt="" data-testid={ `${index}-horizontal-image` } />
            <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            {item.type === 'meal' ? (
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.nationality} - ${item.category}`}
                </p>
                <p data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }>
                  {item.tags[0]}
                </p>
                <p data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }>
                  {item.tags[1]}
                </p>
              </div>
            )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </p>
              )}
            <button
              type="button"
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share button"
              />
            </button>
          </div>
        ))
      }
    </div>
  );
}
