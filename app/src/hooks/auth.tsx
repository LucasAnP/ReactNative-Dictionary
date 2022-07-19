import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { apiAllWords, apiAllWordsWithoutJWT, authApi } from "../services/api";

interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    email: string;
    favorites?: string[];
    history?: string[];
}

interface AuthContextData {
    user: User;
    login(): Promise<void>;
    userStoragedLoading: boolean;
    favoriteWord(word: string): any;
    getUserById(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>({} as User);
    const [userStoragedLoading, setUserStoragedLoading] = useState(true);
    const async_key = "@dictionary:user";

    useEffect(() => {
        async function loadUserLoggedData() {
            const userStoraged = await AsyncStorage.getItem(async_key);
            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }

            setUserStoragedLoading(false);
        }
        loadUserLoggedData();
    }, []);

    async function createAccount(logged) {
        try {
            const userLogged = {
                id: logged.user.id,
                email: logged.user.email,
                favorites: [],
                history: [],
            };
            await apiAllWords.post("/users", {
                user_id: userLogged.id,
                email: userLogged.email,
                favorites: userLogged.favorites,
                history: userLogged.history,
            })
            await AsyncStorage.setItem(async_key, JSON.stringify(userLogged));
        } catch (error) {

        }
    }

    async function getUserById() {
        try {
            const request = await apiAllWordsWithoutJWT.get(`/users?user_id=eq.${user.id}&select=*`);
            setUser({
                id: request.data[0].user_id,
                email: request.data[0].email,
                favorites: request.data[0].favorites,
                history: request.data[0].history
            });
        } catch (error) {
            console.warn('Error when get user');
        }
    }

    async function getUserByIdAndCreateIfDont(logged) {
        try {
            const request = await apiAllWordsWithoutJWT.get(`/users?user_id=eq.${logged.user.id}&select=*`);
            setUser({
                id: request.data[0].user_id,
                email: request.data[0].email,
                favorites: request.data[0].favorites,
                history: request.data[0].history
            });
        } catch (error) {
            await createAccount(logged);
        }
    }

    async function login() {
        try {
            //Do the login
            const { data } = await authApi.post("/token?grant_type=password", {
                email: "teste3@gmail.com",
                password: "123456",
            });

            //Check if user exist in DB (account created) and if dont, create an account
            getUserByIdAndCreateIfDont(data);

        } catch (error) {
            console.warn("error", error);
            return
        }
    }



    async function registerUserFavorites(word: string) {
        const userAfterUpdate = await apiAllWords.patch(`/users?user_id=eq.${user.id}`, {
            favorites: [
                ...user.favorites,
                word
            ]
        });
    }
    async function favoriteWord(word: string) {
        if (user.favorites.length > 0) {
            const newUserLogged = {
                ...user,
                favorites: [...user.favorites, word],
            };
            setUser(newUserLogged);
            registerUserFavorites(word)
        } else {
            const newUserLogged = {
                ...user,
                favorites: [word],
            };
            setUser(newUserLogged);
            registerUserFavorites(word)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                userStoragedLoading,
                favoriteWord,
                getUserById,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };
