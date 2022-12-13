import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';
import fetchApiRecipe from '../service/fechApiRecipe';
import fetchData from '../service/fetchData';
import setLocalStorage from '../service/setLocalStorage';
import './RecipeDetails.css';
import getVerification from '../service/recipeDetaisVerification';
import shareLink from '../service/shareLink';

export default function RecipeDetails() {
  const { recipeData, isMeal, ingredients,
    setIngredients, setRecipeData, setIsMeal, setIdRecipe } = useContext(RecipeContext);
  const [embedId, setEmbedId] = useState(null);
  const [carouselList, setCarouselList] = useState(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/')[2];
  const meal = path.includes('/meals');
  const { imageOf,
    nameOf,
    idOf,
    dataOf,
    recomendationOf,
    renderCaroucel } = getVerification(meal);
  const [inProgress, setInProgress] = useState(null);

  useEffect(() => {
    const setData = async () => {
      const localStg = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const found = localStg
        ? localStg.find((favRecipe) => favRecipe.id === id) : false;
      if (found) setIsFavorite(true);

      const data = await fetchData(id, meal);
      setRecipeData(await data);
      setIsMeal(meal); setIdRecipe(data[idOf]);
    };
    setData();
  }, [id, idOf, meal, setIdRecipe, setIsMeal, setRecipeData]);

  useEffect(() => {
    const setDataCarousel = async () => {
      const data = await fetchApiRecipe(meal);
      setCarouselList(data);
    };
    setDataCarousel();
  }, [setCarouselList, dataOf, meal]);

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
        .map((ingredient, i) => (
          { quantity: quantities[i] ? quantities[i] : '',
            name: ingredient,
            checked: false }));
      setIngredients(recipe);

      if (meal) {
        const getEmbedId = recipeData?.strYoutube.split('=')[1];
        setEmbedId(getEmbedId);
      }
    }
  }, [recipeData, setIngredients, meal]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
    const doneRecipesLocalStorage = Object
      .values(list).some((item, i) => Object.keys(item)[i] === id);
    setInProgress(doneRecipesLocalStorage);
  }, [id]);

  if (recipeData) {
    return (
      <div className="page-details">
        <div className="imgPrincipal">
          <img
            src={ recipeData[imageOf] }
            alt={ recipeData[nameOf] }
            data-testid="recipe-photo"
          />
        </div>
        <div className="recipe-name">
          <h1 data-testid="recipe-title">{ recipeData[nameOf] }</h1>
        </div>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ () => {
            setLocalStorage(recipeData, isMeal);
            setIsFavorite(!isFavorite);
          } }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="favorite button"
          />
        </button>
        <button
          type="button"
          onClick={ () => {
            shareLink((isMeal ? 'meal' : 'drink'), id);
            setShowCopyMessage(true);
          } }
          data-testid="share-btn"
        >
          <img
            src={ shareIcon }
            alt="share button"
          />
        </button>
        {showCopyMessage && <span style={ { fontSize: '10px' } }>Link copied!</span>}
        {meal ? <h4 data-testid="recipe-category">{ recipeData.strCategory }</h4>
          : (
            <h4 data-testid="recipe-category">
              { `${recipeData.strCategory}, ${recipeData.strAlcoholic}`}
            </h4>) }
        <div className="ingredientes-main">
          <h3>Ingredientes</h3>
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
          <h3>Instructions</h3>
          <div className="instructions">

            <p data-testid="instructions">{ recipeData.strInstructions }</p>
          </div>
        </div>
        <div className="Video">
          {embedId && (
            <div>
              <h3>Video</h3>
              <iframe
                title={ recipeData[nameOf] }
                data-testid="video"
                src={ `https://www.youtube.com/embed/${embedId}` }
              />
            </div>
          )}
        </div>
        <h3>Recomendations</h3>
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
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-btn"
          onClick={ () => history.push(`/${dataOf}/${recipeData[idOf]}/in-progress`) }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </div>
    );
  }
}
