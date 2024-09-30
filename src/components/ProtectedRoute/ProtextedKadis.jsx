// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

const ProtectedKadis = ({ element: Component, ...rest }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Check for token in localStorage
    const user = JSON.parse(localStorage.getItem('user')); // Get user data from localStorage

    // Check if user is authenticated and has role_id = 2
    const isAuthorized = isAuthenticated && user && user.role === 3;

    return isAuthorized ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedKadis;
