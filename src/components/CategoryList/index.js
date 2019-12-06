import React, { useState, useEffect } from 'react';
import CardList from '../../components/CardList';
import api from '../../services/api';
import './styles.css';
import { Button } from "react-bootstrap";

const CategoryList = ({ category, fetchNextCategoryPageByName }) => {

    const [elements, setElements] = useState([]);

    const fetchMoreElements = () => {
        fetchNextCategoryPageByName(category.toLowerCase()).then(
            (categoryPage) => {
                if (categoryPage !== null) setElements([...elements, ...categoryPage.results]);
            }
        );
    };

    useEffect(() => {
        fetchMoreElements();
        // api.get(`/${category}`)
        //     .then(response => {
        //         setElements([...response.data.results]);
        //     })
    }, [category]);

    return (
        <div className="List col-md-12 flex-wrap d-flex">
            <div className="col-md-12 flex-wrap d-flex">
                {elements.map((element, index) => (
                    <CardList key={index} itemId={index + 1} element={element} category={category} />
                ))}
            </div>
            <div className="container container-options flex-wrap d-flex">
                <button type="button" id="btn-show-more" className="btn btn-secondary"
                        onClick={fetchMoreElements}>
                    Show me more
                </button>
            </div>
        </div>
    );
}

export default CategoryList;
