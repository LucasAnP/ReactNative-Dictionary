import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { apiAllWords, authApi } from "../services/api";

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
    favoriteWord: any;
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
                console.log("User", userLogged);
                setUser(userLogged);
            }

            setUserStoragedLoading(false);
        }
        loadUserLoggedData();
    }, []);

    async function createAccount() {
        try {
            const { data } = await authApi.post("/token?grant_type=password", {
                email: "teste1@gmail.com",
                password: "123456",

            });
        } catch (error) {

        }
    }

    async function login() {
        try {
            const { data } = await authApi.post("/token?grant_type=password", {
                email: "teste3@gmail.com",
                password: "123456",
            });
            if (data.user.id) {
                const userLogged = {
                    id: data.user.id,
                    email: data.user.email,
                    favorites: [],
                    history: [],
                };
                const response = await apiAllWords.post("/users", {
                    user_id: data.user.id,
                    email: userLogged.email,
                    favorites: userLogged.favorites,
                    history: userLogged.history,
                })
                console.log(response)
                setUser(userLogged);
                await AsyncStorage.setItem(async_key, JSON.stringify(userLogged));

            }
        } catch (error) {
            console.log("error", error);
        }
    }

    async function favoriteWord(word: string) {
        if (user.favorites) {
            const newUserLogged = {
                id: user.id,
                email: user.email,
                favorites: [...user.favorites, word],
            };
            setUser(newUserLogged);
        } else {
            const newUserLogged = {
                id: user.id,
                email: user.email,
                favorites: [word],
            };
            setUser(newUserLogged);
        }
        // await apiAllWords.post(`/users?some_column=user_id.${user.id}`, {
        //     favorites: user.favorites
        // })
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                userStoragedLoading,
                favoriteWord,
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
