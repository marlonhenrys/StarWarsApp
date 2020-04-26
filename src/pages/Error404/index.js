import React from 'react';
import {Link} from "react-router-dom";
import SadStormtrooper from "../../assets/sad_stormtrooper.svg";
import './styles.css';

const Error404 = () => {
    return (
        <div className="Error404">
            <h1 className={"title"}>Sorry, page not found</h1>
            <img src={SadStormtrooper} alt={"Sad stormtrooper"} className={"sad-image"}/>
            <br/>
            <span className={"bg-dark link-container"}>
                {/*<span className="icon">
                    <i className="fa fa-long-arrow-left"/>
                </span>*/}
                <Link to={"/"} className="links">Back</Link>
            </span>
        </div>
    );
};

export default Error404;
