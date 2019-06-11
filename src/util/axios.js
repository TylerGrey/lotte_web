import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'http://www.tylergrey.ml:8080/api',
});
// client.defaults.headers.common['Authorization'] = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : '';

export default client;
