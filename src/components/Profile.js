import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const emailDoUsuario = localStorage.getItem('user');
  //   favoriteRecipes;
  const localStorageClear = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <span data-testid="profile-email">
        {emailDoUsuario}
      </span>
      <br />
      <br />
      <button
        name="done recipes"
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <br />
      <button
        name="favorite recipes"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <br />
      <button
        name="logout"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ localStorageClear }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
