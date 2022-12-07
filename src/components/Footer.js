import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIconSVG from '../images/drinkIcon.svg';
import mealIconSVG from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  const history = useHistory();

  const toDrinks = () => {
    history.push('/drinks');
  };

  const toMeals = () => {
    history.push('/meals');
  };
  return (
    <div>
      <footer
        data-testid="footer"
        className="footer"
      >
        <button
          type="button"
          onClick={ toDrinks }
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIconSVG }
            alt="SVG drinks"
          />
        </button>
        <button
          type="button"
          onClick={ toMeals }
        >
          <img
            data-testid="meals-bottom-btn"
            src={ mealIconSVG }
            alt="SVG meals"
          />
        </button>
      </footer>
    </div>
  );
}
