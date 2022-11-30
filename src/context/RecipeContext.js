import { createContext, useEffect, useState, useMemo } from 'react';
import fetchMeals from '../service/fechMeals';
import fetchDrinks from '../service/fechDrinks';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [dataMeal, setDataMeal] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);

  useEffect(() => {
    fetchMeals(id)
      .then((response) => setDataMeal(response));
  }, []);

  useEffect(() => {
    fetchDrinks(id)
      .then((response) => setDataDrink(response));
  }, []);

  const value = useMemo(() => ({
    dataDrink,
    setDataDrink,
    dataMeal,
    setDataMeal,
  }), [dataMeal, dataDrink]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
