import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080'
})

axiosInstance.interceptors.request.use((config) => {
    //config.headers.Authorization = `Basic cGVhc2FudDoxMjM0`;
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Basic ${token}` : '';
    return config;
})