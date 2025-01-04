import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children, allowedGroups }) => {
    const { isAuthenticated, isLoading, userGroup } = useContext(AuthContext);
    if (isLoading) {
        return;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (allowedGroups && !allowedGroups.includes(userGroup)) {
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
