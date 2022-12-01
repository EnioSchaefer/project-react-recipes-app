import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchApiRecipe from '../service/fechApiRecipe';
import fetchData from '../service/fetchData';

export default function RecipeDetails() {
  const { recipeData, isMeal, ingredients,
    setIngredients, setRecipeData,
    idRecipe, setIsMeal, setIdRecipe } = useContext(RecipeContext);
  const [embedId, setEmbedId] = useState(null);
  const [carouselList, setCarouselList] = useState(null);
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/')[2];
  const meal = path.includes('/meals');
  const imageOf = isMeal ? 'strMealThumb' : 'strDrinkThumb';
  const nameOf = isMeal ? 'strMeal' : 'strDrink';
  const idOf = meal ? 'idMeal' : 'idDrink';

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData(id, meal);
      setRecipeData(await data);
      setIsMeal(meal); setIdRecipe(data[idOf]);
    };
    setData();
  }, [setRecipeData, idRecipe, isMeal, id, meal, idOf, setIdRecipe, setIsMeal]);

  useEffect(() => {
    const setDataCarousel = async () => {
      const data = await fetchApiRecipe(meal);
      setCarouselList(await data);
      setIsMeal(meal);
    };
    setDataCarousel();
  }, [setCarouselList, setIsMeal, meal]);

  useEffect(() => {
    console.log(carouselList);
  }, [carouselList]);

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
      <>
        <img
          src={ recipeData[imageOf] }
          alt={ recipeData[nameOf] }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{ recipeData[nameOf] }</h2>
        {meal ? <h4 data-testid="recipe-category">{ recipeData.strCategory }</h4>
          : (
            <h4 data-testid="recipe-category">
              {
                `${recipeData.strCategory}, ${recipeData.strAlcoholic}`
              }
            </h4>) }
        <h4 data-testid="recipe-category">{ recipeData.strCategory }</h4>
        <div>
          {ingredients.map((ingredient, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient.quantity} ${ingredient.name}`}
            </p>))}
        </div>
        <h4 data-testid="instructions">{ recipeData.strInstructions }</h4>
        {embedId && <iframe
          title={ recipeData[nameOf] }
          data-testid="video"
          src={ `https://www.youtube.com/embed/${embedId}` }
        />}
      </>
    );
  }
}
