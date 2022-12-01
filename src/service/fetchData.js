const fetchData = async (id, meal) => {
  const url = meal ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = fetch(url)
    .then((response) => response.json())
    .then((data) => data[meal ? 'meals' : 'drinks'])
    .catch((error) => console.error(error));
  console.log(request);
  return request;
};

export default fetchData;
