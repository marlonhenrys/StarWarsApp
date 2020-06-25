import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import CategoryList from "../../components/CategoryList";

const Category = ({ match, darkModeActived, changeTheme }) => {
    const category = match.params.category;
    
    return (
        <LayoutTemplate headerTitle={category} darkModeActived={darkModeActived} changeTheme={changeTheme}>
            <CategoryList category={category}/>
        </LayoutTemplate>
    );
};

export default Category;
