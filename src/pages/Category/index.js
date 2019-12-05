import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import CategoryList from "../../components/CategoryList";

const Category = (props) => {

    const category = props.match.params.category;

    return (
        <LayoutTemplate headerTitle={"Explore this universe"} darkModeActived={props.darkModeActived} changeTheme={() => props.changeTheme()}>
            <div className="Category">
                {category} category :)
                <CategoryList category={category} />
            </div>
        </LayoutTemplate>
    );
};

export default Category;
