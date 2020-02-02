import React, { useState, useEffect } from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import zenserpImageAPI from '../../services/zenserpImageAPI';
import scaleserpImageAPI from '../../services/scaleserpImageAPI';
import pixabayImageAPI from '../../services/pixabayImageAPI';
import getImage from '../../utils/getImage';
import './styles.css';

const Item = (props) => {

    const [dataKeys, setDataKeys] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [ imageUrl, setImageUrl ] = useState('');

    useEffect(() => {
        carregaDados();
    }, []);

    useEffect(() => {
        if (title)
            getImage([zenserpImageAPI, scaleserpImageAPI, pixabayImageAPI], title, [
                (response) => setImageUrl(response.data.image_results[0].sourceUrl),
                (response) => setImageUrl(response.data.image_results[0].image),
                (response) => setImageUrl(response.data.hits[0].largeImageURL),
            ]);
    }, [title]);

    const itemId = props.match.params.id;
    const category = props.match.params.category;

    const carregaDados = async () => {
        const data = await props.fetchCategoryItem(category, itemId);
        const keys = Object.keys(data);
        const values = Object.values(data);
        setTitle(data.name ? data.name : data.title);
        setDataKeys(keys);
        setDataValues(values);
        setLoading(false);
    }

    return (
        <LayoutTemplate headerTitle={category} darkModeActived={props.darkModeActived} changeTheme={() => props.changeTheme()}>
            {loading ? <p>Loading...</p> : null}
            <div className="Item">
                <div className="card">
                    { !imageUrl ? null : <img className="card-img-top" src={imageUrl} alt={title} height="200px"></img> }
                    
                    {dataKeys.map((key, index) => {
                        const value = dataValues[index];
                        if (!String(value).startsWith('http')) {
                            return (
                                <div key={index}>
                                    <div className="card-body">
                                        <strong>{key}: </strong>
                                        <span>{dataValues[index]}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </LayoutTemplate >
    );
};

export default Item;
