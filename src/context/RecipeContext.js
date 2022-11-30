import { createContext, useMemo, useState } from 'react';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [filterCategory, setFilterCategory] = useState(null);
  const [idRecipe, setIdRecipe] = useState('');

  const value = useMemo(() => ({
    filterCategory,
    setFilterCategory,
    idRecipe,
    setIdRecipe,
  }), [filterCategory, idRecipe]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
