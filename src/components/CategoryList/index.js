import React, { useState, useEffect } from 'react';
import CardList from '../../components/CardList';
import api from '../../services/api';
import './styles.css';
import { Button } from "react-bootstrap";
import searchIcon from "../../assets/search-solid.svg";

const CategoryList = ({ setClearItems, clearItems, category, fetchNextCategoryPageByName, clearCategoryPages }) => {

    const [elements, setElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');

    const fetchMoreElements = async () => {
        setLoading(true);
        const categoryPageAndIsCached = await fetchNextCategoryPageByName(
            category.toLowerCase());
            
        if (categoryPageAndIsCached !== null)
        {
            const [ categoryPage, isCached ] = categoryPageAndIsCached;
            setLoading(false);
    
            if (categoryPage !== null) setElements([...elements, ...categoryPage.results]);
            else clearCategoryPages(category.toLowerCase());
        }
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

    const filterElements = (element) => {
        const title = element.name ? element.name.toLowerCase() : element.title.toLowerCase();
        let matches = true;

        for (const filter of nameFilter.split(' '))
        {
            matches = matches && title.indexOf(filter.toLowerCase()) != -1;
        }

        return matches;
    };
    
    return (
        <div className="List col-md-12 flex-wrap d-flex">
            <div className="col-md-12 flex-wrap d-flex">
                {elements.filter(filterElements).map((element, index) => (
                    <CardList key={index} itemId={element.url.split('/')[5]} element={element} category={category} />
                ))}
            </div>
            <div className="container container-options flex-wrap d-flex">
                {loading ? <p>Loading...</p> : null }
                <button type="button" id="btn-show-more" className="btn btn-secondary"
                        onClick={fetchMoreElements}>
                    Show me more
                </button>
            </div>
            <div className="row">
                <div className="col-md-4 col-md-offset-3">
                    <form action="" className="search-form">
                        <div className="form-group has-feedback">
                            <label htmlFor="search" className="sr-only">Search</label>
                            <input type="text" className="form-control" name="search"
                                    id="search" placeholder="search"
                                    onChange={(e) => setNameFilter(e.target.value)}/>
                            <span className="form-control-feedback">
                                <img src={searchIcon} alt="Search Icon" className="icon"/>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CategoryList;
