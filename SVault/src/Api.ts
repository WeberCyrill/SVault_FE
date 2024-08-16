import axios from "axios";

export const axiosInstance = axios.create({})

axiosInstance.interceptors.request.use((config) => {
    //config.headers.Authorization = `Basic cGVhc2FudDoxMjM0`;
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Basic ${token}` : '';
    return config;
})