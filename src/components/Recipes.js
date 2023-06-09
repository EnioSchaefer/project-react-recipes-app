import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Categories from './Categories';
import Footer from './Footer';
import Header from './Header';
import './Recipes.css';
import drinkIconSVG from '../images/drinkIcon.svg';
import mealIconSVG from '../images/mealIcon.svg';

function Recipes() {
  const history = useHistory();
  const path = history.location.pathname;
  const renderAmount = 12;
  const meal = path === '/meals';
  const nameOf = meal ? 'strMeal' : 'strDrink';
  const imageOf = meal ? 'strMealThumb' : 'strDrinkThumb';
  const dataOf = meal ? 'meals' : 'drinks';
  const idOf = meal ? 'idMeal' : 'idDrink';
  // const [apiResponse, setApiResponse] = useState(null);
  const { filterCategory, setRecipes, recipes } = useContext(RecipeContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      const url = meal ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
        : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data[dataOf]);
    };
    fetchRecipes();
  }, [dataOf, meal, setRecipes]);

  return (
    <div>
      <div>
        <Header
          icon={ meal ? mealIconSVG : drinkIconSVG }
          title={ meal ? 'Meals' : 'Drinks' }
          showSearch
        />
        <Categories />
        <div className="recipes">
          {(filterCategory || recipes)?.map((recipe, index) => index < renderAmount && (
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
      </div>
      <Footer />
    </div>
  );
}

export default Recipes;
