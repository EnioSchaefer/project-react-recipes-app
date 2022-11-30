import { createContext, useMemo, useState } from 'react';

const LoginContext = createContext();

export default LoginContext;

export function LoginProvider({ children }) {
  const [filterCategory, setFilterCategory] = useState(null);

  const filterCategoryProvider = useMemo(() => (
    { filterCategory, setFilterCategory }), [filterCategory, setFilterCategory]);

  return (
    <LoginContext.Provider value={ filterCategoryProvider }>
      {children}
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {}.isRequired;
