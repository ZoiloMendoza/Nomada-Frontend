import React, { createContext, useContext, useState } from 'react';

export const UserContext = createContext(null);
export const UseContextProvider = ({ children }) => {
  const [variableState, setVariableState] = useState(false);
  const values = React.useMemo(
    () => ({
      variableState, // States que seran visibles en el contexto.
      setVariableState, // Funciones que son exportadas para manejo externo.
    }),
    [variableState],
  );
  console.log(variableState);
  return <UserContext.Provider values={{ setVariableState, variableState }}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
  console.log(UserContext, ' shalala');
  const context = useContext(UserContext);
  if (!context) console.log('hay un error');
  return context;
};

//const { myValue, setMyValue } = useContext(MyContext);
