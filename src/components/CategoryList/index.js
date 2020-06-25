import React, { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import { APIContext } from '../../contexts/APIContext';
import CardList from '../../components/CardList';
import './styles.css';
import searchIcon from "../../assets/search-solid.svg";

/*
Related discussion:
https://github.com/facebook/create-react-app/issues/6880
https://github.com/facebook/react/issues/15084
https://github.com/facebook/react/issues/14920
*/
const useGetter = (value) => {
    const ref = useRef(value);
    
    useEffect(() => {
        ref.current = value;
    });

    return useCallback(() => ref.current, [ref]);
};

const CategoryList = ({ category }) => {
    const { categoriesData, fetchCategoryPage } = useContext(APIContext);
    const elements = Object.values(categoriesData[category].entities);
    const fetchCategoryPageWrapper = useGetter(fetchCategoryPage);
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState('');
    
    const fetchMoreElements = useCallback(() => {
        const source = axios.CancelToken.source();
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                await fetchCategoryPageWrapper()(category);
                if (!cancelled) setLoading(false);
            } catch (error) {
                console.info(error);
            }
        })();

        return () => {
            cancelled = true;
            source.cancel("Request cancelled on component unmount");
        }
    }, [fetchCategoryPageWrapper, category]);

    useEffect(fetchMoreElements, [fetchMoreElements]);

    const filterElements = (element) => {
        const title = element.name ? element.name.toLowerCase() : element.title.toLowerCase();
        let matches = true;

        for (const filter of nameFilter.split(' '))
        {
            matches = matches && title.indexOf(filter.toLowerCase()) !== -1;
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
                {loading ? <Spinner animation="border" /> : null }
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
