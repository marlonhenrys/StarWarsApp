import React, { useState, useEffect } from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';

const Item = (props) => {

    const [dataKeys, setDataKeys] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const [title, setTitle] = useState('');


    useEffect(() => {
        carregaDados()
    }, []);

    const itemId = props.match.params.id;
    const category = props.match.params.category;

    const carregaDados = async () => {
        const data = await props.fetchCategoryItem(category, itemId);
        const keys = Object.keys(data);
        const values = Object.values(data);
        setDataKeys(keys);
        setDataValues(values);
    }


    return (
        <LayoutTemplate headerTitle={category} darkModeActived={props.darkModeActived} changeTheme={() => props.changeTheme()}>
            <div className="Item">
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
                })}
            </div>
        </LayoutTemplate >
    );
};

export default Item;
