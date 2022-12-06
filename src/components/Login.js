import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [emailLogin, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //   const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();

  //   emailValidate = () => {
  const minNumber = 7;
  const emailTest = emailLogin.includes('@')
    && emailLogin.includes('.com');
  const disableButton = password.length < minNumber
      || !emailTest;

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: emailLogin }));

    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="text"
          data-testid="email-input"
          value={ emailLogin }
          onChange={ ({ target }) => setEmail(target.value) }
        //   onChange={ () => handleChange() }
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          //   onChange={ () => handleChange() }
        />
      </label>
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disableButton }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
