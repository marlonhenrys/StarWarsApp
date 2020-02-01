import axios from 'axios';
import credentials from './scaleserp.json';

const scaleserpImageAPI = axios.create({
    baseURL: 'https://api.scaleserp.com/search',
    params: {
        api_key: credentials.apiKey,
        search_type: "images",
        output: "json",
        images_page: "1",
        no_cache: "false",
        images_size: "medium",
    }
});

export default scaleserpImageAPI;
