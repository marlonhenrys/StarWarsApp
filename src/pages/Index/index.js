import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import './styles.css';
import {Button} from "react-bootstrap";

const Index = () => {
    return (
        <div className="Index">
            <img src={ require("../../assets/starwars_title.svg") } alt={"Star Wars Logo"} className={"title"} />

            <div className="btns-introduction d-flex justify-content-around">
                <Link to={"/register"}>
                    <Button variant="primary" size="lg">Introduce myself</Button>
                </Link>
                <Link to={"/login"}>
                    <Button variant="primary" size="lg">Explore</Button>
                </Link>
            </div>
        </div>

    );
};

export default Index;
