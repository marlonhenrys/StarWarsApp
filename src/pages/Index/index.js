import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import './styles.css';

const Index = () => {
    return (
        <div className="Index">
            <img src={ require("../../assets/starwars_title.svg") } alt={"Star Wars Logo"} className={"title"}/>
            {/*<h1 className="title">Star Wars</h1>*/}

            <div className="btns-introduction d-flex justify-content-around">
                <Link to={"/register"}>
                    <button type="button" className="btn btn-primary btn-lg">Introduce myself</button>
                </Link>
                <Link to={"/login"}>
                    <button type="button" className="btn btn-primary btn-lg">Explore</button>
                </Link>
            </div>
        </div>
    );
};

export default Index;
