import axios from 'axios';

export const API_BASE = 'https://swapi.co/api/';

async function fetchUrl(url = API_BASE, saveState = false, apiData, setApiData)
{
    const isCached = !!apiData[url];
    let result = null;

    if (isCached) result = [apiData[url], isCached];

    else
    {
        try
        {
            const response = await axios.get(url);

            if (saveState) setApiData({ ...apiData, [url]: response.data });

            result = [response.data, isCached];
        }

        catch (error) { console.log(error); }
        
    }

    return result;
}

// A URL já tem que vir com o filtro de page. O parâmetro page desta função
// é usado apenas para guardá-lo no objeto buscado
async function fetchCategoryUrl(
    urlBase, url, page = 1, apiData, setApiData, categoriesPages, setCategoriesPages)
{
    let result = null;

    try
    {
        const dataAndCacheStatus = await fetchUrl(url, false, apiData, setApiData);
    
        if (dataAndCacheStatus !== null)
        {
            const [data, isCached] = dataAndCacheStatus;
    
            if (!isCached)
            {
                data.url = url;
                data.page = page;
    
                const newApiData = { ...apiData, [url]: data };
    
                // Além de fazer o cache da url da categoria, faz o cache das urls
                // de cada um dos itens dela
                data.results.forEach((result) => newApiData[result.url] = result);
    
                setApiData(newApiData);
    
                const categoryInfo = {page, maxReached: false};
                setCategoriesPages({...categoriesPages, [urlBase]: categoryInfo});
            }
    
            result = [data, isCached];
        }
    }
    
    catch (error)
    {
        console.log(error);
        const categoryInfo = {page, maxReached: true};
        setCategoriesPages({...categoriesPages, [urlBase]: categoryInfo});
    }

    return result;
}

function fetchNextCategoryPageUrl(
    url, apiData, setApiData, categoriesPages, setCategoriesPages)
{
    const page = categoriesPages[url] ? categoriesPages[url].page + 1 : 1;
    const pageQuery = page === 1 ? '' : `?page=${page}`;

    return fetchCategoryUrl(
        url, `${url}${pageQuery}`, page, apiData, setApiData,
        categoriesPages, setCategoriesPages
    );
}

function fetchNextCategoryPageByName(
    name, apiData, setApiData, categoriesPages, setCategoriesPages)
{
    return fetchNextCategoryPageUrl(
        `${API_BASE}${name}/`, apiData, setApiData,
        categoriesPages, setCategoriesPages
    );
}

function fetchCategory(
    categoryName, page = 1, apiData, setApiData, categoriesPages, setCategoriesPages)
{
    const pageQuery = page === 1 ? '' : `?page=${page}`;
    const urlBase = `${API_BASE}${categoryName}/`;

    return fetchCategoryUrl(
        urlBase, `${urlBase}${pageQuery}`, page, apiData, setApiData,
        categoriesPages, setCategoriesPages
    );
}

async function fetchCategoryItemUrl(url, apiData, setApiData)
{
    let result = null;

    const dataAndCacheStatus = await fetchUrl(url, false, apiData, setApiData);

    if (dataAndCacheStatus !== null)
    {
        const [data, isCached] = dataAndCacheStatus;

        if (!isCached)
        {
            setApiData({ ...apiData, [url]: data });
        }

        result = data;
    }

    return result;
}

function fetchCategoryItem(categoryName, id, apiData, setApiData)
{
    return fetchCategoryItemUrl(`${API_BASE}${categoryName}/${id}`, apiData, setApiData);
}

function clearCategoryPages(categoryName, categoriesPages, setCategoriesPages)
{
    const urlBase = `${API_BASE}${categoryName}/`;

    setCategoriesPages({...categoriesPages, [urlBase]: null});
}

const starWarsAPI = {
    baseURL: API_BASE,
    fetchUrl,
    fetchCategoryUrl,
    fetchNextCategoryPageUrl,
    fetchNextCategoryPageByName,
    fetchCategory,
    fetchCategoryItemUrl,
    fetchCategoryItem,
    clearCategoryPages,
};

export default starWarsAPI;
