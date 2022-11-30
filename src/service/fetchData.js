const fetchData = async (id, meal) => {
  const url = meal ? `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(url);
  const response = await request.json();
  // ((data) => data[meal ? 'meals' : 'drinks'])
  // catch((error) => console.error(error));
  console.log(response[meal ? 'meals' : 'drinks']);
  return response[meal ? 'meals' : 'drinks'];
};

export default fetchData;
