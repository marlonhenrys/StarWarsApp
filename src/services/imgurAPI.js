import axios from 'axios';

export const BASE_URL = "https://api.imgur.com/3/gallery/search/";

const imgurAPI = axios.create({
    baseURL: BASE_URL,
    headers: {
        authorization: "Client-ID 9d1bcd3fbd51356"
    }
})

export default imgurAPI;
