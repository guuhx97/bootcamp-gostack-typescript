import AsyncStorage from '@react-native-community/async-storage';
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import IAuthContext from '../interfaces/IAuthContext';
import IAuthState from '../interfaces/IAuthState';
import AuthState from '../interfaces/IAuthState';
import api from '../services/api';

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

 const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

      if(token[1] && user[1] ){
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email, password
    })

    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)]
    ])
    setData({ token, user });
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);
    setData({} as AuthState);
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
}

export { AuthContext, AuthProvider, useAuth };
