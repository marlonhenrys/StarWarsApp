import React, { useState, useEffect } from 'react';
import CardList from '../../components/CardList';
import api from '../../services/api';
import './styles.css';
import { Button } from "react-bootstrap";

const CategoryList = ({ setClearItems, clearItems, category, fetchNextCategoryPageByName, clearCategoryPages }) => {

    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMoreElements = () => {
        setLoading(true);
        fetchNextCategoryPageByName(category.toLowerCase()).then(
            (categoryPage) => {
                setLoading(false);
                if (categoryPage !== null) setElements([...elements, ...categoryPage.results]);
                else
                {
                    clearCategoryPages(category.toLowerCase());
                }
            }
        );
    };

    useEffect(() => {
        /* if (clearItems)
        {
            setElements([]);
            setClearItems(false);
        }
        else  */fetchMoreElements();
        // api.get(`/${category}`)
        //     .then(response => {
        //         setElements([...response.data.results]);
        //     })
    }, [category, clearItems]);

    return (
        <div className="List col-md-12 flex-wrap d-flex">
            <div className="col-md-12 flex-wrap d-flex">
                {elements.map((element, index) => (
                    <CardList key={index} itemId={index + 1} element={element} category={category} />
                ))}
            </div>
            <div className="container container-options flex-wrap d-flex">
                {loading ? <p>Loading...</p> : null }
                <button type="button" id="btn-show-more" className="btn btn-secondary"
                        onClick={fetchMoreElements}>
                    Show me more
                </button>
            </div>
        </div>
    );
}

export default CategoryList;
