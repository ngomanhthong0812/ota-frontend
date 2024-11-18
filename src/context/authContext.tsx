'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { parseCookies, setCookie } from 'nookies';

interface TypeAuthContext {
    token: string | null,
    saveToken: (newToken: string, rememberMe: boolean) => void,
    clearToken: () => void,
}

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies.access_token;
        if (token) {
            setToken(token);
        }
    }, [])

    const saveToken = (newToken: string, rememberMe: boolean) => {
        setToken(newToken);
        if (rememberMe) {
            setCookie(null, "access_token", newToken, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            })
        } else {
            setCookie(null, "access_token", newToken, {
                maxAge: 60 * 60,
                path: '/',
            }) // het hang sau 1h
        }
    }

    const clearToken = () => {
        setToken(null);
        setCookie(null, "access_token", "", { path: "/", maxAge: -1 });
    }

    return (
        <AuthContext.Provider value={{ token, saveToken, clearToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useToolbar must be used within a ToolbarProvider');
    }
    return context;
}