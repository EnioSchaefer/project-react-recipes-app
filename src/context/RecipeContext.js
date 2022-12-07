import { createContext, useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();

  useEffect(() => {
    const fetchUrl = (request, url, id) => {
      if (request[url] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      if (request[url].length === 1) {
        setRecipes(request[url]);
        const oneItem = request[url][0][id];
        history.push(`/${url}/${oneItem}`);
      } else if (request[url].length > 1) {
        setRecipes(request[url]);
      }
    };
    async function fetchApi() {
      const { search, type } = searchBy;
      if (search.length > 1 && type === 'first-letter') {
        const warning = global.alert('Your search must have only 1 (one) character');
        return warning;
      }
      if (path === '/drinks') {
        const request = await fetchDrinks(search, type);
        fetchUrl(request, 'drinks', 'idDrink');
      }
      if (path === '/meals') {
        const request = await fetchMeals(search, type);
        fetchUrl(request, 'meals', 'idMeal');
      }
    }
    fetchApi();
    // console.log(fetchApi());
  }, [
    searchBy, path, history,
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
