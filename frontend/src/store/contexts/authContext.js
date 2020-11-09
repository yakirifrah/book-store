import { createContext } from 'react';
import { AuthStore } from '../authStore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  return <AuthContext.Provider value={new AuthStore()}>{children}></AuthContext.Provider>;
};
