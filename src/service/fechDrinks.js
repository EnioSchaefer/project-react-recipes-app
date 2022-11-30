const fetchDrink = (idDrink) => {
  const request = fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`)
    .then((response) => response.json())
    .then((data) => data.results)
    .catch((error) => console.error(error));
  return request;
};

export default fetchDrink;
