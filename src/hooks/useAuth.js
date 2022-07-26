import { createContext, useContext, Context } from 'react'
import useToken from './useToken';

const authUserContext = createContext({
  token: null,
  user: null,
  setUser: async () => {},
  // loading: true,
  setToken: async () => {},
  removeToken: async () => {},
  removeUser: async () => {}
});

export function AuthUserProvider({ children }) {
  const auth = useToken();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);