import axios from 'axios';
import credentials from './pixabay.json';

const pixabayImageAPI = axios.create({
    baseURL: 'https://pixabay.com/api/',
    params: {
        key: credentials.apiKey,
        per_page: 3,
    },
});

export default pixabayImageAPI;
