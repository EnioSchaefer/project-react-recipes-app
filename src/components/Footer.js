import React from 'react';
import drinkIconSVG from '../images/drinkIcon.svg';
import mealIconSVG from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <div>
      <footer
        data-testid="footer"
        className="footer"
      >
        <button
          type="button"
        // onClick={}
        >
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIconSVG }
            alt="SVG drinks"
          />
        </button>
        <button
          type="button"
        // onClick={}
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
