import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import UserIndex from '../pages/userIndex/UserIndex';
import ModeratorIndex from '../pages/moderatorIndex/ModeratorIndex';
import AdminIndex from '../pages/adminIndex/AdminIndex';

const HomePage = () => {
    const { isAuthenticated, isLoading, userGroup } = useContext(AuthContext);

    if (isLoading) {
        return
    }

    if (!isAuthenticated) {
        return <UserIndex />;
    }

    switch (userGroup) {
        case 0:
            return <UserIndex />;
        case 1:
            return <ModeratorIndex />;
        case 2:
            return <AdminIndex />;
    }
};

export default HomePage;
