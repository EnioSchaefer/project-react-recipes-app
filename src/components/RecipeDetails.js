import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import fetchApiRecipe from '../service/fechApiRecipe';
import fetchData from '../service/fetchData';
import './RecipeDetails.css';

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
  const idOf = isMeal ? 'idMeal' : 'idDrink';
  const dataOf = isMeal ? 'meals' : 'drinks';
  const recomendationOf = !isMeal ? 'meals' : 'drinks';
  const renderCaroucel = 6;

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
      setCarouselList(data);
      console.log(await data);
    };
    setDataCarousel();
  }, [setCarouselList, dataOf, meal]);

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
          <p data-testid="recipe-title">{ recipeData[nameOf] }</p>
        </div>
        {meal ? <p data-testid="recipe-category">{ recipeData.strCategory }</p>
          : (
            <p data-testid="recipe-category">
              {
                `${recipeData.strCategory}, ${recipeData.strAlcoholic}`
              }
            </p>) }
        <p data-testid="recipe-category">{ recipeData.strCategory }</p>
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
          <div className="instructions">

            <p data-testid="instructions">{ recipeData.strInstructions }</p>
          </div>
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
        <div className="carouselCard">
          <div className="carousel">
            {carouselList && carouselList.map((item, index) => index < renderCaroucel && (

              <Link
                to={ `/${recomendationOf}/${item[!isMeal ? 'idMeal' : 'idDrink']}` }
                key={ index }

              >
                <div className="img-carousel">
                  <img
                    src={ item[!isMeal ? 'strMealThumb' : 'strDrinkThumb'] }
                    data-testid={ `${index}-recommendation-card` }
                    alt={ item[!isMeal ? 'strMeal' : 'strDrink'] }
                  />
                </div>
                <p data-testid={ `${index}-recommendation-title` }>
                  {item[!isMeal ? 'strMeal' : 'strDrink']}
                </p>
              </Link>

            ))}
          </div>
        </div>
      </div>
    );
  }
}
