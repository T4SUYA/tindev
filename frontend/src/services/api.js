import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    timeout: 10000,
    headers: { 'Content-type' : 'application/json' }
});

export default api;