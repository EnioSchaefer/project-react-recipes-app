const setLocalStorage = (recipe, isMeal) => {
  const id = recipe[isMeal ? 'idMeal' : 'idDrink'];
  const nationality = isMeal ? recipe.strArea : '';
  const type = isMeal ? 'meal' : 'drink';
  const category = recipe.strCategory;
  const alcoholicOrNot = isMeal ? '' : recipe.strAlcoholic;
  const name = recipe[isMeal ? 'strMeal' : 'strDrink'];
  const image = recipe[isMeal ? 'strMealThumb' : 'strDrinkThumb'];

  const localStg = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const currLocalStr = localStg || [];

  const newRecipe = {
    id,
    nationality,
    type,
    category,
    alcoholicOrNot,
    name,
    image,
  };

  localStorage.setItem('favoriteRecipes', JSON.stringify([...currLocalStr, newRecipe]));
};

export default setLocalStorage;
