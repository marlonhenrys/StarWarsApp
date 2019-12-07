import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

const CardList = ({ element, itemId, category }) => {

    const title = element.name ? element.name : element.title;
    // debugger;

    return (
        <div className="CardList col-lg-4 col-md-6">
            <div className="card-header"><strong>{title}</strong></div>
            <div className="card-body">
            <Link
                    to={category + '/' + itemId}
                    className="btn btn-color"
                >I want more</Link>
            </div>
        </div>
    );
}

export default CardList;
