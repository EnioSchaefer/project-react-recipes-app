import { createContext, useMemo, useState, useEffect } from 'react';
import fetchDrinks from '../service/fetchDrinks';
import fetchMeals from '../service/fetchMeals';

const RecipeContext = createContext();

export default RecipeContext;

export function RecipeProvider({ children }) {
  const [searchBy, setSearchBy] = useState({
    search: '',
    type: '',
  });
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [path, setPath] = useState('');
  const [radio, setRadio] = useState('');

  useEffect(() => {
    async function fetchApi() {
      const { search, type } = searchBy;
      if (search.length > 1 && type === 'first-letter') {
        const warning = global.alert('Your search must have only 1 (one) character');
        return warning;
      }
      if (path === '/drinks') {
        const request = await fetchDrinks(search, type);
        return request;
      }
      if (path === '/meals') {
        const request = await fetchMeals(search, type);
        return request;
      }
    }
    fetchApi();
    // console.log(fetchApi());
  }, [
    searchBy, path,
  ]);

  const values = useMemo(() => (
    { recipes,
      setRecipes,
      searchInput,
      setSearchInput,
      radio,
      setRadio,
      path,
      setPath,
      searchBy,
      setSearchBy }
  ), [recipes,
    searchInput,
    radio,
    path,
    searchBy]);

  return (
    <RecipeContext.Provider value={ values }>
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {}.isRequired;
