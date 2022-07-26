import React, { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import axios from "axios";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { api } from "../services/api";
import { useRouter } from 'next/router'
type SignInType = {
    username: string;
    password: string;
}

type User = {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    last_accessed: string;
    role: string;
    songs: any[];
    categories: any[];
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInType) => Promise<void>,
    signOut: (data: SignInType) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: any) {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'louvor.token': token } = parseCookies();
        if (token) {
            api.get('/admin/user')
                .then(
                    (res) => {
                        setUser(res.data);
                    }
                )
        }
        else {
            setUser(null);
        }
    }, [router])

    async function signIn({ username, password }: SignInType) {
        try {
            const response = await axios({
                method: "POST",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/admin/token`,
                data: { username, password },
            })
            setCookie(undefined, "louvor.token", response.data.token, {
                maxAge: 60 * 60 * 2, // 2 hours
            });

            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

            setUser(response.data.user);
            Router.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    async function signOut() {
        try {
            destroyCookie(undefined, "louvor.token");
            setUser(null);

            api.defaults.headers.common['Authorization'] = ''

            Router.push("/");

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
