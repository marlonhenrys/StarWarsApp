import React, { useState, useEffect } from 'react';
import CardList from '../../components/CardList';
import api from '../../services/api';
import './styles.css';

const CategoryList = ({ category }) => {

    const [elements, setElements] = useState([]);

    useEffect(() => {
        api.get(`/${category}`)
            .then(response => {
                setElements([...response.data.results]);
            })
    }, [elements]);

    return (
        <div className="List">
            {elements.map(element => (
                <CardList key={element.name ? element.name : element.title} element={element} />
            ))}
        </div>
    );
}

export default CategoryList;
