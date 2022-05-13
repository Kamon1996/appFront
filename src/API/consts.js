import axios from 'axios';
export const API = axios.create({
  baseURL: 'http://127.0.0.1:3001',
});

API.defaults.headers['client'] = 'socialApp';
API.defaults.headers['Accept'] = 'application/json';

if (localStorage.getItem('access-token')) {
  API.defaults.headers.common['access-token'] =
    localStorage.getItem('access-token');
}

if (localStorage.getItem('uid')) {
  API.defaults.headers.common['uid'] = localStorage.getItem('uid');
}
