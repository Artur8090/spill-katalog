// UserContext.tsx
import { createContext, useContext, useState } from 'react';

type UserContextType = {
  loggedInUser: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  loggedInUser: null,
  login: () => false,
  logout: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  const login = (username: string, password: string) => {
    if (username && password) {
      setLoggedInUser(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);