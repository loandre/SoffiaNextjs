// src/contexts/auth.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import apiServices from '../../src/lib/api/loginAPI'; // Ajuste o caminho conforme necessário


type AuthContextType = {
  user: any; // Substitua any pela tipagem do seu usuário
  signed: boolean;
  loading: boolean;
  signin: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string, rg: string, cpf: string, oab: string) => Promise<boolean>;
  signout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signed: false,
  loading: true,
  signin: async () => false,
  signup: async () => false,
  signout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null); // Substitua any pela tipagem do seu usuário
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setUser({ token: storedToken });
    }
    setLoading(false);
  }, []);

  const signin = async (email: string, password: string) => {
    try {
      const data = await apiServices.login(email, password);
      localStorage.setItem('token', data.token);
      setUser(data);
      return true;
    } catch (error: any) { // Substitua any pela tipagem adequada do erro
      console.error(error);
      return false;
    }
  };

  const signup = async (name: string, email: string, phone: string, password: string, rg: string, cpf: string, oab: string) => {
    try {
      await apiServices.register(name, email, phone, password, rg, cpf, oab);
      return true;
    } catch (error: any) { // Substitua any pela tipagem adequada do erro
      console.error(error);
      return false;
    }
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, loading, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
