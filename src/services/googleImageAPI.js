/* import axios from 'axios';
import googleSearchCredentials from './google-search.json';
const google = require('googleapis').google;
const customSearch = google.customsearch('v1');

const googleImageAPI = {
    get: (query) => {
        return customSearch.cse.list({
            auth: googleSearchCredentials.apiKey,
            cx: googleSearchCredentials.searchEngineId,
            q: query,
            searchType: 'image',
            num: 1,
        });
    }
}

export default googleImageAPI;
 */