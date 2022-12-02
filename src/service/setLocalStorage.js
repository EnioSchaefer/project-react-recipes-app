const setLocalStorage = (recipe, isMeal) => {
  const id = recipe[isMeal ? 'idMeal' : 'idDrink'];

  const localStg = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const currLocalStg = localStg || [];
  const duplicate = currLocalStg.find((locRecipe) => locRecipe.id === id);
  if (duplicate) {
    const removed = currLocalStg.filter((locRecipe) => locRecipe.id !== id);
    return localStorage.setItem('favoriteRecipes', JSON.stringify(removed));
  }

  const nationality = isMeal ? recipe.strArea : '';
  const type = isMeal ? 'meal' : 'drink';
  const category = recipe.strCategory;
  const alcoholicOrNot = isMeal ? '' : recipe.strAlcoholic;
  const name = recipe[isMeal ? 'strMeal' : 'strDrink'];
  const image = recipe[isMeal ? 'strMealThumb' : 'strDrinkThumb'];

  const newRecipe = {
    id,
    nationality,
    type,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  localStorage.setItem('favoriteRecipes', JSON.stringify([...currLocalStg, newRecipe]));
};

export default setLocalStorage;
