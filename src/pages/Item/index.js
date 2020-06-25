import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import { APIContext } from '../../contexts/APIContext';
import CardImage from '../../components/CardImage';

const Item = ({ match, darkModeActived, changeTheme }) => {
    const itemId = match.params.id;
    const category = match.params.category;

    const { fetchEntity } = useContext(APIContext);
    const [dataKeys, setDataKeys] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const [title, setTitle] = useState(null);
    const [loading, setLoading] = useState(true);

    const cachedFetchEntity = useCallback(fetchEntity, []);
    
    useEffect(() => {
        const source = axios.CancelToken.source();
        let cancelled = false;

        (async () => {
            try {
                const data = await cachedFetchEntity(category, itemId, source.token);
                if (!cancelled) {
                    const keys = Object.keys(data);
                    const values = Object.values(data);
                    const titleIndex = keys.findIndex(key => key === "name" || key === "title");
                    setTitle(values[titleIndex]);
                    setDataKeys(keys);
                    setDataValues(values);
                    setLoading(false);
                }
            } catch (error) {
                console.info(error);
            }
        })();

        return () => {
            cancelled = true;
            source.cancel("Request cancelled on component unmount");
        }
    }, [cachedFetchEntity, category, itemId]);

    return (
        <LayoutTemplate headerTitle={category} darkModeActived={darkModeActived} changeTheme={changeTheme}>
            {loading ? <Spinner animation="border" /> : null}
            <div className="Item">
                <div className="card">
                    {title && <CardImage title={title} />}
                    {dataKeys.map((key, index) => {
                        const value = dataValues[index];
                        if (!String(value).startsWith('http')) {
                            return (
                                <div key={index}>
                                    <div className="card-body">
                                        <strong>{key}: </strong>
                                        <span>{dataValues[index]}</span>
                                    </div>
                                </ div>
                            )
                        }
                        return null;
                    })}
                </div>
            </div>
        </LayoutTemplate >
    );
};

export default Item;
