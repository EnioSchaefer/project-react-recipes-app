import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import './Categories.css';
import mealIconSVG from '../images/mealIcon.svg';

function Categories() {
  const history = useHistory();
  const path = history.location.pathname;
  const renderAmount = 5;
  const meal = path === '/meals';
  const dataOf = meal ? 'meals' : 'drinks';
  const [categories, setCategories] = useState(null);
  const { setFilterCategory } = useContext(RecipeContext);

  useEffect(() => {
    const fetchData = async () => {
      const url = meal ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();

      const prepCategories = data[dataOf]
        .map((category, i) => i < renderAmount
        && { name: category.strCategory, selected: false })
        .filter((category) => category !== false);
      setCategories(prepCategories);
    };
    fetchData();
  }, [dataOf, meal]);

  const changeCategory = async (category) => {
    const url = meal ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const data = await response.json();

    const newCategories = categories.map((curr) => {
      if (curr.name === category) { curr.selected = !curr.selected; }
      return curr;
    });

    const isSelected = newCategories
      .find((curr) => curr.name === category && curr.selected === true);

    if (isSelected) { setFilterCategory(data[dataOf]); } else { setFilterCategory(null); }
    setCategories(newCategories);
  };

  if (!categories) return <p>Loading Categories...</p>;

  return (
    <div className="categories-button">
      {categories.map((category, index) => index < renderAmount && (
        <button
          type="button"
          key={ index }
          data-testid={ `${category.name}-category-filter` }
          onClick={ () => changeCategory(category.name) }
        >
          {category.name}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setFilterCategory(null) }
      >
        <img
          src={ mealIconSVG }
          alt="All categories icon SVG"
        />
        All
      </button>
    </div>
  );
}

export default Categories;
