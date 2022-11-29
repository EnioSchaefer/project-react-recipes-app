import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Categories() {
  const history = useHistory();
  const path = history.location.pathname;
  const renderAmount = 5;
  const meal = path === '/meals';
  const dataOf = meal ? 'meals' : 'drinks';
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = meal ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
        : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const response = await fetch(url);
      const data = await response.json();
      setApiResponse(data[dataOf]);
    };
    fetchData();
  }, []);

  if (!apiResponse) return <p>Loading Categories...</p>;

  return (
    <div>
      {apiResponse.map((category, index) => index < renderAmount && (
        <button
          type="button"
          key={ index }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default Categories;
