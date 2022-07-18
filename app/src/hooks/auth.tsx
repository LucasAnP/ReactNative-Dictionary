import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { MainRoutes } from '../routes/app.routes';
import { authApi } from '../services/api';

interface AuthProviderProps {
    children: ReactNode
}

interface User {
    id: string;
    email: string;
}

interface AuthContextData {
    user: User;
    login(): Promise<void>
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);

    async function login() {
        try {
            const { data } = await authApi.post('/signup', {
                email: "lucass1@gmail.com",
                password: "123456"
            })
            console.log('response', data)
            if (data.id) {
                const userLogged = {
                    id: data.id,
                    email: data.email,
                }
                setUser(userLogged);
                await AsyncStorage.setItem('@dictionary:user', JSON.stringify(userLogged))
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }