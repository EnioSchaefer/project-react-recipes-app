import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Categories from './Categories';
import './Recipes.css';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const renderAmount = 12;
  const meal = path === '/meals';
  const nameOf = meal ? 'strMeal' : 'strDrink';
  const imageOf = meal ? 'strMealThumb' : 'strDrinkThumb';
  const dataOf = meal ? 'meals' : 'drinks';
  const idOf = meal ? 'idMeal' : 'idDrink';
  const [apiResponse, setApiResponse] = useState(null);
  const { filterCategory } = useContext(RecipeContext);

  useEffect(() => {
    const fetchData = async () => {
      const url = meal ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setApiResponse(data[dataOf]);
    };
    fetchData();
  }, [dataOf, meal]);

  if (!apiResponse) return <p>Loading Recipes...</p>;

  return (
    <div>
      <Categories />

      {(filterCategory || apiResponse).map((recipe, index) => index < renderAmount && (
        <Link
          to={ `${dataOf}/${recipe[idOf]}` }
          data-testid={ `${index}-recipe-card` }
          key={ index }
          className="recipeCard"
        >
          <img
            src={ recipe[imageOf] }
            data-testid={ `${index}-card-img` }
            alt={ recipe[nameOf] }
          />
          <p data-testid={ `${index}-card-name` }>{recipe[nameOf]}</p>
        </Link>
      ))}
    </div>
  );
}

export default Recipes;
