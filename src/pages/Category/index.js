import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import CategoryList from '../../components/CategoryList';

const Category = ({ darkModeActived, changeTheme }) => {

    const url = window.location.href;
    const category = url.split('=')[1];
    console.log(category);

    return (
        <LayoutTemplate darkModeActived={darkModeActived} changeTheme={changeTheme} >
            <CategoryList category={category} />
        </LayoutTemplate>
    );
};

export default Category;
