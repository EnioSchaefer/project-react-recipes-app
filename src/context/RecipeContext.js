import { createContext, useState } from 'react';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [filterCategory, setFilterCategory] = useState(null);

  return (
    <RecipeContext.Provider value={ { filterCategory, setFilterCategory } }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
