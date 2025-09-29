/* eslint-disable import/no-cycle */
/* eslint-disable react/jsx-no-constructed-context-values */

'use client';

import { IAttribute } from '@/interfaces/Attribute';
import api from '@/services/api';
import handleError from '@/utils/handleToast';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { ILoginForm } from '@/validations/LoginSchema';
import { useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

export interface IUser extends IAttribute {
  email: string;
  username: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: IAttribute;
}

export interface ILoginResponse {
  jwt: string;
  refreshToken: string;
  user: IUser;
  role: {
    name: string;
  }
}

interface IUserProvider {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<SetStateAction<IUser>>;
  isAuthenticated: boolean;
  login: (form: ILoginForm) => Promise<void>;
  logout: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    const localStorageUser = localStorage.getItem(localStorageKeys.user);
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
    setIsLoading(false);
  }, []);

  const isAuthenticated = !!user?.id && !isLoading;

  if (isLoading) {
    return null;
  }

  const login = async (form: ILoginForm) => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);
    localStorage.removeItem(localStorageKeys.refreshToken);

    const { data } = await api.post<ILoginResponse>('auth/local', {
      identifier: form?.email,
      password: form?.password,
      requestRefresh: form?.remember_me,
    });

    const ADMIN_ROLE_NAME = 'Master';

    if (data?.role?.name !== ADMIN_ROLE_NAME) {
      handleError('Acesso negado');
      return;
    }

    setUser(data?.user);

    localStorage.setItem(localStorageKeys.user, JSON.stringify(data?.user));
    localStorage.setItem(localStorageKeys.accessToken, data?.jwt);
    localStorage.setItem(localStorageKeys.refreshToken, data?.refreshToken);
  };

  const logout = () => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);
    localStorage.removeItem(localStorageKeys.refreshToken);

    setUser({} as IUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
