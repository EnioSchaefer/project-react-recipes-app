import { createContext, useMemo, useState } from 'react';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [filterCategory, setFilterCategory] = useState(null);

  const filterCategoryProvider = useMemo(() => (
    { filterCategory, setFilterCategory }), [filterCategory, setFilterCategory]);

  return (
    <RecipeContext.Provider value={ filterCategoryProvider }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
