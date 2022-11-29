import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Categories from './Categories';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const renderAmount = 12;
  const meal = path === '/meals';
  const nameOf = meal ? 'strMeal' : 'strDrink';
  const imageOf = meal ? 'strMealThumb' : 'strDrinkThumb';
  const dataOf = meal ? 'meals' : 'drinks';
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = meal ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setApiResponse(data[dataOf]);
    };
    fetchData();
  }, []);

  if (!apiResponse) return <p>Loading Recipes...</p>;

  return (
    <div>
      <Categories />

      {apiResponse.map((recipe, index) => index < renderAmount && (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ recipe[imageOf] }
            data-testid={ `${index}-card-img` }
            alt={ recipe[nameOf] }
          />
          <p data-testid={ `${index}-card-name` }>{recipe[nameOf]}</p>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
