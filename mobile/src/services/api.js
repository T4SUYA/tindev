import axios from 'axios';

const api = axios.create({
  baseURL: 'https://tindevreact.herokuapp.com',
  timeout: 5000,
  headers: { 'Content-type' : 'application/json' }
});

export default api;
