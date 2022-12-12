export default function getVerification(meal) {
  return {
    imageOf: meal ? 'strMealThumb' : 'strDrinkThumb',
    nameOf: meal ? 'strMeal' : 'strDrink',
    idOf: meal ? 'idMeal' : 'idDrink',
    dataOf: meal ? 'meals' : 'drinks',
    recomendationOf: !meal ? 'meals' : 'drinks',
    renderCaroucel: 6,
  };
}
