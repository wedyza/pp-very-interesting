import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userGroup, setUserGroup] = useState(null);
    const [userAvatar, setUserAvatar] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('accessToken');
            if (!token) {
                setIsAuthenticated(false);
                setUserGroup(null);
                setIsLoading(false);
                return;
            }
            try {
                const verifyResponse = await fetch(`${API_URL}/auth/jwt/verify/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (!verifyResponse.ok) {
                    setIsAuthenticated(false);
                    setUserGroup(null);
                    localStorage.removeItem('accessToken');
                    setIsLoading(false);
                    return;
                }

                const userResponse = await fetch(`${API_URL}/users/me/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (userResponse.ok) {
                    const userData = await userResponse.json();
                    setIsAuthenticated(true);
                    setUserGroup(userData.user_group);
                    setUserAvatar(userData.avatar);
                } else {
                    setIsAuthenticated(false);
                    setUserGroup(null);
                    localStorage.removeItem('accessToken');
                }
            } catch (error) {
                console.error('Ошибка при проверке пользователя:', error);
                setIsAuthenticated(false);
                setUserGroup(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();

        const interval = setInterval(checkAuth, 15 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const logout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
        setUserGroup(null);
        setUserAvatar(null);
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                userGroup,
                userAvatar,
                setUserAvatar,
                setUserGroup,
                setIsAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
