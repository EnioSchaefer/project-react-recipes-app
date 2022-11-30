import { createContext, useEffect, useState, useMemo } from 'react';
import fetchMeals from '../service/fechMeals';
import fetchDrinks from '../service/fechDrinks';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [dataMeal, setDataMeal] = useState([]);
  const [dataDrink, setDataDrink] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);

  // useEffect(() => {
  //   fetchMeals(id)
  //     .then((response) => setDataMeal(response));
  // }, []);

  // useEffect(() => {
  //   fetchDrinks(id)
  //     .then((response) => setDataDrink(response));
  // }, []);

  const value = useMemo(() => ({
    filterCategory,
    setFilterCategory,
    dataDrink,
    setDataDrink,
    dataMeal,
    setDataMeal,
  }), [dataMeal, dataDrink, filterCategory]);

  return (
    <RecipeContext.Provider value={ value }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
