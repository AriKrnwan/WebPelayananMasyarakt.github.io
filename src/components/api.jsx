// src/components/api.jsx
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:4121/api', // Your API base URL
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // Token is expired or invalid, handle logout
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('selectedPengajuan');
            window.location.href = '/login'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default api;

