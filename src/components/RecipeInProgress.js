import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';
import fetchData from '../service/fetchData';
import setLocalStorage from '../service/setLocalStorage';
import './RecipeInProgress.css';

function RecipeInProgress() {
  const { recipeData, isMeal, ingredients,
    setIngredients, setRecipeData,
    idRecipe,
    setIsMeal,
    setIdRecipe,
    setCheckedIngredients,
    checkedIngredients } = useContext(RecipeContext);
  const [embedId, setEmbedId] = useState(null);
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const path = history.location.pathname;
  const id = path.split('/')[2];
  const meal = path.includes('/meals');
  const imageOf = isMeal ? 'strMealThumb' : 'strDrinkThumb';
  const nameOf = isMeal ? 'strMeal' : 'strDrink';
  const idOf = isMeal ? 'idMeal' : 'idDrink';
  const style = { textDecoration: 'line-through solid rgb(0, 0, 0)' };
  const noStyle = { textDecoration: 'none' };

  useEffect(() => {
    const setData = async () => {
      const data = await fetchData(id, meal);
      setRecipeData(await data);
      setIsMeal(meal); setIdRecipe(data[idOf]);
    };
    setData();
  }, [setRecipeData, idRecipe, isMeal, id, meal, idOf, setIdRecipe, setIsMeal]);

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

  const finishRecipe = () => {
    const date = new Date();
    const localData = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const tagsArray = recipeData.strTags ? recipeData.strTags.split(',') : [];
    console.log(tagsArray);
    const obj = [{
      id,
      type: isMeal ? 'meal' : 'drink',
      nationality: isMeal ? recipeData.strArea : '',
      category: recipeData.strCategory,
      alcoholicOrNot: isMeal ? '' : recipeData.strAlcoholic,
      name: recipeData[isMeal ? 'strMeal' : 'strDrink'],
      image: recipeData[isMeal ? 'strMealThumb' : 'strDrinkThumb'],
      doneDate: date.toISOString(),
      tags: tagsArray,
    }];
    console.log(obj);
    localStorage.setItem('doneRecipes', JSON.stringify([...localData, ...obj]));
    history.push('/done-recipes');
  };

  const handleCheck = ({ target }) => {
    const { name, checked } = target;
    console.log(name);
    if (checked) {
      setCheckedIngredients({ ...checkedIngredients, [name]: true });
    } else {
      setCheckedIngredients({ ...checkedIngredients, [name]: false });
    }
  };

  const shareLink = () => {
    const addres = window.location.href.split('/in-progress')[0];
    copy(addres);
    setShowCopyMessage(true);
    const fiveSeconds = 5000;
    setTimeout(() => {
      setShowCopyMessage(false);
    }, fiveSeconds);
  };

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
        <button
          className="favorite-bt"
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
          className="share-bt"
          type="button"
          onClick={ shareLink }
          data-testid="share-btn"
        >
          <img
            src={ shareIcon }
            alt="share button"
          />
        </button>
        {showCopyMessage
          && <span style={ { fontSize: '10px' } }>Link copied!</span>}
        {meal ? <h4 data-testid="recipe-category">{ recipeData.strCategory }</h4>
          : (
            <h4 data-testid="recipe-category">
              { `${recipeData.strCategory}, ${recipeData.strAlcoholic}`}
            </h4>) }
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
              <label
                htmlFor="checkbox"
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                style={ (checkedIngredients[ingredient.name]) ? style : noStyle }
              >
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <input
                    // className={ checkedIngredients ? 'sublinha' : null }
                    type="checkbox"
                    id="checkbox"
                    onChange={ (e) => handleCheck(e) }
                    name={ ingredient.name }

                  />

                  {`${ingredient.quantity} ${ingredient.name}`}

                </p>
              </label>
            ))}
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
        <button
          type="button"
          data-testid="finish-recipe-btn"
          className="finish-btn"
          onClick={ finishRecipe }
        >
          Finalizar
        </button>

      </div>
    );
  }
}
export default RecipeInProgress;
