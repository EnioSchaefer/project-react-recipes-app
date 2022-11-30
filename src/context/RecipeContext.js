import { createContext, useEffect, useState, useMemo } from 'react';
import fetchData from '../service/fetchData';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [recipeData, setRecipeData] = useState(null);
  const [filterCategory, setFilterCategory] = useState(null);
  const [idRecipe, setIdRecipe] = useState('');
  const [isMeal, setIsMeal] = useState(true);

  useEffect(() => {
    fetchData(idRecipe, isMeal)
      .then((response) => setRecipeData(response));
  }, [idRecipe, isMeal]);

  const value = useMemo(() => ({
    idRecipe,
    setIdRecipe,
    filterCategory,
    setFilterCategory,
    recipeData,
    setRecipeData,
    isMeal,
    setIsMeal,
  }), [recipeData, filterCategory, idRecipe, isMeal]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
