import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api',
});
client.defaults.headers.common['Authorization'] = '';

export default client;
