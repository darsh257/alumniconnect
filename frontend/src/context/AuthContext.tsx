import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fetchWithAuth } from '../utils/api';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'STUDENT' | 'ALUMNI' | 'ADMIN';
    avatar_url?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                if (token === 'mock-token') {
                    const storedRole = localStorage.getItem('userRole') as 'STUDENT' | 'ALUMNI' | 'ADMIN' || 'STUDENT';
                    setUser({ id: '123', email: 'test@example.com', name: 'Test User', role: storedRole });
                    setLoading(false);
                    return;
                }
                
                try {
                    const response = await fetchWithAuth('/auth/me');
                    if (response.ok) {
                        const data = await response.json();
                        setUser(data.user);
                        localStorage.setItem('userRole', data.user.role);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Failed to load user', error);
                    logout();
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        };

        loadUser();
    }, [token]);

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem('token', newToken);
        localStorage.setItem('userRole', newUser.role);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
