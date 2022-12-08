const fetchDrinks = async (search, type) => {
  if (type === 'ingredient') {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
    const request = await fetch(endPoint);
    const response = await request.json();
    return response;
  }
  if (type === 'name') {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    const request = await fetch(endPoint);
    const response = await request.json();
    return response;
  }
  if (type === 'first-letter') {
    const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    const request = await fetch(endPoint);
    const response = await request.json();
    return response;
  }
};

export default fetchDrinks;
