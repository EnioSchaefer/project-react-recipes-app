const fetchData = async (id, meal) => {
  const url = meal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[meal ? 'meals' : 'drinks'][0];
};

export default fetchData;
