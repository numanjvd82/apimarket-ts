import { useContext, createContext, useState } from 'react';

export type IUser = {
  email: string;
  password: string;
  role: string;
  accessToken: string;
};

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  if (!useContext(AuthContext)) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return useContext(AuthContext);
};
