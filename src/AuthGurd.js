import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGurd = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('myToken');
        if (!token) {
            navigate('/'); // Redirect to login page if token is not present
        }
    }, [navigate]);

    return <>{children}</>;
};

export default AuthGurd;
