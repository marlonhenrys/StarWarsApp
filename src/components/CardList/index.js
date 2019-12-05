import React from 'react';
import './styles.css';

const CardList = ({ element }) => {
    return (
        <div className="card">
            <div className="card-header">{element.name ? element.name : element.title}</div>
            <div className="card-body">
                <p>Text card body</p>
            </div>
        </div>
    );
}

export default CardList;
