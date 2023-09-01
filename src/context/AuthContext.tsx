import { createContext } from 'react';

interface User {
  id: string;
  name: string;
  authToken: string;
}

interface AuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  setUser: () => {},
});
