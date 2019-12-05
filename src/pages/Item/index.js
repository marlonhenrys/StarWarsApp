import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';

const Item = (props) => {

    const itemId = props.match.params.id;
    const category = props.match.params.category;

    return (
        <LayoutTemplate>
            <div className="Item">
                Category {category} - Item {itemId}
            </div>
        </LayoutTemplate>
    );
};

export default Item;
