const fetchMeals = (idMeal) => {
  const request = fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.error(error));
  return request;
};

export default fetchMeals;
