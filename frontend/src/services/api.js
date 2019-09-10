import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API || "http://localhost:8080",
    timeout: 5000,
    headers: { 'Content-type' : 'application/json' }
});

export default api;