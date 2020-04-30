import React, { createContext, useState } from 'react';
import axios from 'axios';

import api, { BASE_URL } from '../services/api';

const categories = ["films", "people", "planets", "species", "starships", "vehicles"];

const INITIAL_STATE = categories.reduce(
    (categoriesData, category) => {
        categoriesData[category] = { next: `${BASE_URL}/${category}/`, entities: {} }
        return categoriesData
    }, {}
);

export const APIContext = createContext(INITIAL_STATE);

const APIContextProvider = ({ children }) => {
   /**
    * @typedef {Object<string, string | string[]>} Entity
    * @typedef {{ next: string, entities: Object<number, Entity> }} CategoryData
    * @typedef {{ [category: string]: CategoryData }} CategoriesData
    * @type {[CategoriesData, (categoriesData: CategoriesData) => void]}
    */
    const [categoriesData, setCategoriesData] = useState(INITIAL_STATE);
    
    const mergeCategoryDataTo = (categoriesData, category, categoryData) => {
        return { ...categoriesData, [category]: {
            ...categoriesData[category],
            ...categoryData
        }}
    }
    
    const cacheEntities = (categoriesData, category, ...entities) => {
        const entitiesObj = entities.reduce((entitiesObj, entity) => {
            const entityId = entity.url.split('/')[5];
            entitiesObj[entityId] = entity;
            return entitiesObj;
        }, {});
        
        return mergeCategoryDataTo(categoriesData, category, {
            entities: {
                ...categoriesData[category].entities,
                ...entitiesObj
            }
        });
    }
    
    const fetchEntity = async (category, id, cancelToken) => {
        let entity = categoriesData[category].entities[id];

        if (!entity) {
            const response = await api.get(`${category}/${id}/`, { cancelToken });
            entity = response.data;
            const newCategoriesData = cacheEntities(categoriesData, category, entity);
            setCategoriesData(newCategoriesData);
        }

        return entity;
    }
    
    const fetchCategoryPage = async (category, cancelToken) => {
        let categoryPage = null;
        const next = categoriesData[category].next;
        
        if (next !== null) {
            const response = await axios.get(next.replace('http', 'https'), { cancelToken });
            categoryPage = response.data;
            let newCategoriesData = mergeCategoryDataTo(categoriesData, category, categoryPage);
            newCategoriesData = cacheEntities(newCategoriesData, category, ...categoryPage.results);
            setCategoriesData(newCategoriesData);
        }
        
        return categoryPage;
    }

    return (
        <APIContext.Provider value={{ categoriesData, fetchEntity, fetchCategoryPage }}>
            {children}
        </APIContext.Provider>
    );
}

export default APIContextProvider;
