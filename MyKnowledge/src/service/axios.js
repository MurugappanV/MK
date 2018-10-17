import axios from 'axios';

export const BaseAxiosInstance = axios.create({
    baseURL: 'http://34.232.141.238/api/v1/',    
    timeout: 5000,
    headers: {'Content-Type': 'application/json'},
});

export const setCookie = (token) => {
    BaseAxiosInstance.defaults.headers.common['Cookie'] = token
}