import { createContext, useState, useMemo } from 'react';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [recipeData, setRecipeData] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [idRecipe, setIdRecipe] = useState(null);
  const [isMeal, setIsMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

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
  }), [recipeData, filterCategory, idRecipe, isMeal, ingredients]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
