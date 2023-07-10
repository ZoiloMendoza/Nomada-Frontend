import { createContext, useState } from 'react';

export const RoleContext = createContext(null);

export const RoleProvider = ({ children }) => {
  const [roleInvitado, setRoleInvitado] = useState('staff');
  const [roleUsuario, setRoleUsuario] = useState('staff');

  return (
    <RoleContext.Provider value={{ roleInvitado, setRoleInvitado, roleUsuario, setRoleUsuario }}>
      {children}
    </RoleContext.Provider>
  );
};
