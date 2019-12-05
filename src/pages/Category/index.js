import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import Carousel from "../../components/Carousel";

const Category = (props) => {
    const imagesConfig = [props.location.state.imageConfig];

    return (
        <LayoutTemplate headerTitle={"Explore this universe"}>
            <div className="Category">
                <Carousel imagesConfig={imagesConfig} omitControls={true}/>
                <div>
                    {props.match.params.category} category :)
                </div>
            </div>
        </LayoutTemplate>
    );
};

export default Category;
