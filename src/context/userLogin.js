import React, { createContext, useContext, useEffect, useState } from 'react';

export const UserContext = createContext(null);

export const UseContextProvider = ({ children }) => {
  const [variableState, setVariableState] = useState(false);
  useEffect(() => {
    const existingUser = JSON.parse(localStorage.getItem('usuarioLogeado'));
    if (existingUser !== null) {
      setVariableState({ ...existingUser });
    }
  }, []);
  const value = React.useMemo(
    () => ({
      variableState, // States que seran visibles en el contexto.
      setVariableState, // Funciones que son exportadas para manejo externo.
    }),
    [variableState],
  );
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) console.log('hay un error');
  return context;
};

//const { myValue, setMyValue } = useContext(MyContext);
