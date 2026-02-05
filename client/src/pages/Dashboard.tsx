import React from 'react';
import { useAuth } from '../components/Auth';
import Collection from '../components/Collection';

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Welcome to Your Dashboard, {user?.name}!</h1>
            <h2>Your Favorite Poems</h2>
            <Collection />
        </div>
    );
};

export default Dashboard;