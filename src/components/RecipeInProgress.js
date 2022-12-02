import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchData from '../service/fetchData';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { recipeData, isMeal, ingredients,
    setIngredients, setRecipeData,
    idRecipe, setIsMeal, setIdRecipe } = useContext(RecipeContext);
  const [embedId, setEmbedId] = useState(null);
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/')[2];
  const meal = path.includes('/meals');
  const imageOf = isMeal ? 'strMealThumb' : 'strDrinkThumb';
  const nameOf = isMeal ? 'strMeal' : 'strDrink';
  const idOf = isMeal ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData(id, meal);
      setRecipeData(await data);
      setIsMeal(meal); setIdRecipe(data[idOf]);
    };
    setData();
  }, [setRecipeData, idRecipe, isMeal, id, meal, idOf, setIdRecipe, setIsMeal]);

  useEffect(() => {
    if (recipeData) {
      const quantities = Object.values(recipeData).filter((quantity, i) => Object
        .keys(recipeData)[i].includes('strMeasure') && quantity)
        .filter((quantity) => quantity !== ' ' && quantity !== undefined);

      const ingredientsList = Object.values(recipeData).map((ingredient, i) => Object
        .keys(recipeData)[i].includes('strIngredient') && ingredient)
        .filter((ingredient) => ingredient !== ''
        && ingredient !== false && ingredient !== null);

      const recipe = ingredientsList
        .map((ingredient, i) => ({ quantity: quantities[i], name: ingredient }));

      setIngredients(recipe);

      if (meal) {
        const getEmbedId = recipeData?.strYoutube.split('=')[1];
        setEmbedId(getEmbedId);
      }
    }
  }, [recipeData, setIngredients, meal]);

  if (recipeData) {
    return (
      <div className="page-details">
        <div className="imgPrincipal">
          <img
            width="360px"
            height="160px"
            src={ recipeData[imageOf] }
            alt={ recipeData[nameOf] }
            data-testid="recipe-photo"
          />
        </div>

        <div className="recipe-name">
          <h1 data-testid="recipe-title">{ recipeData[nameOf] }</h1>
        </div>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        {meal ? <h1 data-testid="recipe-category">{ recipeData.strCategory }</h1>
          : (
            <p data-testid="recipe-category">
              {
                `${recipeData.strCategory}, ${recipeData.strAlcoholic}`
              }
            </p>) }
        <div className="ingredientes-main">
          <p>Ingredientes</p>
          <div className="ingredients">
            {ingredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient.quantity} ${ingredient.name}`}
              </p>))}
          </div>
        </div>
        <div className="instructions-main">
          <p>Instructions</p>
          <div className="instructions" />
          <h1 data-testid="instructions">{ recipeData.strInstructions }</h1>
        </div>

        <div className="Video">
          {embedId && (
            <div>
              <p>Video</p>
              <iframe
                title={ recipeData[nameOf] }
                data-testid="video"
                src={ `https://www.youtube.com/embed/${embedId}` }
              />
            </div>
          )}
        </div>
        <button type="button" data-testid="finish-recipe-btn">Finalizar</button>

      </div>
    );
  }
}
export default RecipeInProgress;
