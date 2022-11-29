import { createContext } from 'react';

const LoginContext = createContext();

export default LoginContext;

export function LoginProvider({ children }) {
  return (
    <LoginContext.Provider value="">
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {}.isRequired;
