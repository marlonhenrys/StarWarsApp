import axios from 'axios';
import credentials from './zenserp.json';

const zenserpImageAPI = axios.create({
    baseURL: 'https://app.zenserp.com/api/v2/search',
    params: {
        tbm: 'isch',
        apikey: credentials.apiKey,
        num: 1,
    },
});

export default zenserpImageAPI;
