import React from 'react';

function RecipeInProgress() {
  return (
    <div>
      <div data-testid="recipe-photo">Foto</div>
      <h1 data-testid="recipe-title">Título</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <h1 data-testid="recipe-category">Categoria</h1>
      <h1 data-testid="instructions">Instruções</h1>
      <button type="button" data-testid="finish-recipe-btn">Finalizar</button>

    </div>
  );
}

export default RecipeInProgress;
