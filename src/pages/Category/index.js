import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import CategoryList from "../../components/CategoryList";

const Category = (props) => {

    const category = props.match.params.category;

    return (
        <LayoutTemplate headerTitle={category} darkModeActived={props.darkModeActived} changeTheme={() => props.changeTheme()}>
            <CategoryList category={category} />
        </LayoutTemplate>
    );
};

export default Category;
