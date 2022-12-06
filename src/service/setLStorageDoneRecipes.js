export default function setLStorageDoneRecipes() {
  const doneRecipesLocalStorage = [{
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name: '',
    image,
    doneDate,
    tags,
  }];
  localStorage.setItem('favoriteRecipes', JSON.stringify(doneRecipesLocalStorage));
}
