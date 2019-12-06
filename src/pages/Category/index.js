import React, { useState, useEffect } from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import CategoryList from "../../components/CategoryList";

const Category = (props) => {

    const [myCategory, setMyCategory] = useState("");
    const [clearItems, setClearItems] = useState(false);
    const category = props.match.params.category;

    useEffect(
        () => {
            setClearItems(true);
        }
        , [myCategory]
    );
    
    return (
        <LayoutTemplate headerTitle={category} darkModeActived={props.darkModeActived} changeTheme={() => props.changeTheme()}>
            <CategoryList setClearItems={setClearItems} clearItems={clearItems} category={category} clearCategoryPages={props.clearCategoryPages} fetchNextCategoryPageByName={props.fetchNextCategoryPageByName}/>
        </LayoutTemplate>
    );
};

export default Category;
