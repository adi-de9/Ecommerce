import { createContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const servertokenINS = (servertoken) => {
    return localStorage.setItem('token', servertoken);
  };

  return (
    <AuthContext.Provider value={{ servertokenINS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {};
