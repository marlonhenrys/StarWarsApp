import axios from 'axios';

export const BASE_URL = "https://swapi.dev/api";

const api = axios.create({
    baseURL: BASE_URL,
})

export default api;
