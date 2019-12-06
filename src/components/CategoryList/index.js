import React, { useState, useEffect } from 'react';
import CardList from '../../components/CardList';
import api from '../../services/api';
import './styles.css';

const CategoryList = ({ category, fetchNextCategoryPageByName }) => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        fetchNextCategoryPageByName(category.toLowerCase()).then(
            (categoryPage) => {
                if (categoryPage !== null) setElements([...categoryPage.results]);
            }
        );
        // api.get(`/${category}`)
        //     .then(response => {
        //         setElements([...response.data.results]);
        //     })
    }, [category]);

    return (
        <div className="List col-md-12 flex-wrap d-flex">
            {elements.map((element, index) => (
                <CardList key={index} itemId={index + 1} element={element} category={category} />
            ))}
        </div>
    );
}

export default CategoryList;
