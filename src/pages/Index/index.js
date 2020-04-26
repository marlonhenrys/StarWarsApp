import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import StarWarsTitle from '../../assets/starwars_title.svg';
import './styles.css';

const Index = () => {
    return (
        <div className="Index">
            <img src={StarWarsTitle} alt={"Star Wars Logo"} className={"title"} />

            <div className="btns-introduction">
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
