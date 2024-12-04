import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/jwt/verify/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {
                console.error('Ошибка проверки токена:', error);
                setIsAuthenticated(false);
            }
        };

        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
