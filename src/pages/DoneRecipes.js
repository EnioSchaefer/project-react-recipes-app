import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header';
import handleClick from '../service/setDoneLink';
import './DoneRecipes.css';

export default function DoneRecipes() {
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [doneRecipesList, setDoneRecipesList] = useState([]);
  const [doneList, setDoneList] = useState(null);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipesList(list);
    setDoneList(list);
  }, []);

  const handleFilter = ({ target }) => {
    const filter = doneRecipesList.filter((el) => target.id === el.type);
    setDoneRecipesList(filter);
  };

  return (
    <div>
      <Header title="Done Recipes" showSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        id="all"
        onClick={ () => setDoneRecipesList(doneList) }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
        id="meal"
        onClick={ ({ target }) => handleFilter({ target }) }
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        id="drink"
        onClick={ ({ target }) => handleFilter({ target }) }
      >
        Drinks
      </button>
      {
        doneRecipesList && doneRecipesList.map((item, index) => (
          <div key={ index } data-testid="done">
            <Link to={ `${item.type}s/${item.id}` }>
              <img
                src={ item.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <Link to={ `${item.type}s/${item.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{item.name}</p>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
            {item.type === 'meal' ? (
              <div>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.nationality} - ${item.category}`}
                </p>
                <p data-testid={ `${index}-${item.tags[0]}-horizontal-tag` }>
                  {item.tags[0]}
                </p>
                <p data-testid={ `${index}-${item.tags[1]}-horizontal-tag` }>
                  {item.tags[1]}
                </p>
              </div>
            )
              : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </p>
              )}
            <button
              type="button"
              onClick={ ({ target }) => {
                handleClick({ target }, setShowCopyMessage);
              } }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share button"
                name={ item.type }
                id={ item.id }
              />
            </button>
            {showCopyMessage
              && <p style={ { fontSize: '10px' } } data-testid="share">Link copied!</p>}
          </div>
        ))
      }
    </div>
  );
}
