import { createContext, useState, useMemo } from 'react';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [recipeData, setRecipeData] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [idRecipe, setIdRecipe] = useState(null);
  const [isMeal, setIsMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState(false);

  const value = useMemo(() => ({
    idRecipe,
    setIdRecipe,
    filterCategory,
    setFilterCategory,
    recipeData,
    setRecipeData,
    isMeal,
    setIsMeal,
    ingredients,
    setIngredients,
    checkedIngredients,
    setCheckedIngredients,
  }), [recipeData, filterCategory, idRecipe, isMeal, ingredients, checkedIngredients]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
