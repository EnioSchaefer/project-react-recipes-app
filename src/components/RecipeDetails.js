import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function RecipeDetails() {
  const { recipeData, isMeal } = useContext(RecipeContext);
  const imageOf = isMeal ? 'strMealThumb' : 'strDrinkThumb';
  const nameOf = isMeal ? 'strMeal' : 'strDrink';
  if (!recipeData) return 'loading';
  return (
    <>
      oiii
      <img
        src={ recipeData[imageOf] }
        alt={ recipeData[nameOf] }
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{ recipeData[nameOf] }</h2>
      <h4 data-testid="recipe-category">{ recipeData.strCategory }</h4>
      <h4 data-testid={ `${index}-ingredient-name-and-measure` }>ingredientes</h4>
      <h4 data-testid="instructions">{ recipeData.strInstructions }</h4>
    </>
  );
}
