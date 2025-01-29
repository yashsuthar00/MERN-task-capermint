import axios from "axios";

// Create an Axios instance
const api = axios.create({
    baseURL: "https://mern-task-capermint.onrender.com/api/users", 
});

// Add an interceptor to include the Authorization header in every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); 
        if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },    
    (error) => Promise.reject(error) 
);

export default api;
