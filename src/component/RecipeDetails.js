import React from 'react';

export default function RecipeDetails() {
  return (
    <>
      <img src="" alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">Titulo</h2>
      <h4 data-testid="recipe-category">texto da categoria</h4>
      <h4 data-testid={ `${index}-ingredient-name-and-measure` }>ingredientes</h4>
      <h4 data-testid="instructions">instructions</h4>
    </>
  );
}
