'use client'
import React, { createContext, useState, useEffect, ReactNode, useContext, useMemo } from 'react';
import { parseCookies, setCookie } from 'nookies';
import { User } from '@/types/backend';

interface TypeAuthContext {
    token: string | null,
    user: User | null;
    saveToken: (newToken: string, rememberMe: boolean, user: User) => void,
    clearToken: () => void,
}

const AuthContext = createContext<TypeAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const token = cookies.access_token;
        const user = cookies.user ? JSON.parse(cookies.user) : null;
        if (token) {
            setToken(token);
        }
        if (user) {
            setUser(user);
        }
    }, [])

    const saveToken = (newToken: string, rememberMe: boolean, user: User) => {
        setToken(newToken);
        setUser(user);

        const cookieOptions = {
            path: '/',
            maxAge: rememberMe ? 30 * 24 * 60 * 60 : 60 * 60,  // 30 ngày nếu "remember me", 1 giờ nếu không
        };

        // Lưu cookies
        setCookie(null, "access_token", newToken, cookieOptions);
        setCookie(null, "user", JSON.stringify(user), cookieOptions);
    }

    const clearToken = () => {
        setToken(null);
        setUser(null);
        setCookie(null, "access_token", "", { path: "/", maxAge: -1 });
        setCookie(null, "user", "", { path: "/", maxAge: -1 });
    }

    const contextValue = useMemo(
        () => ({
            token,
            user,
            saveToken,
            clearToken,
        }),
        [token, user]
    );

    return (
        <AuthContext.Provider value={contextValue}>
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