import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:4121/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a response interceptor
api.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response && error.response.status === 401) {
            // If 401 Unauthorized error, clear the token and redirect to login
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
