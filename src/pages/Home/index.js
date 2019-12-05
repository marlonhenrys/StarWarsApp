import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import lukeSkyWalker from '../../assets/carousel/starwars_people_lukeskywalker.png';
import tethTve from '../../assets/carousel/starwars_planets_tethtve.png';
import millennium from '../../assets/carousel/starwars_spaceship_millenniumfalcon.png';
import Carousel from "../../components/Carousel";
import {getNameOfLoggedUser} from "../../utils/authAdministration";
import {Link} from "react-router-dom";
import routes from "../../utils/routes";

const imagesConfig = [
    {
        src: lukeSkyWalker,
        title: 'People',
        paragraph: '',
        alt: 'People category',
    },
    {
        src: tethTve,
        title: 'Planets',
        paragraph: '',
        alt: 'Planets category',
    },
    {
        src: millennium,
        title: 'Starships',
        paragraph: '',
        alt: 'Starships category',
    },
];

const Home = () => {
    const username = getNameOfLoggedUser();

    return (
        <LayoutTemplate headerTitle={"Explore this universe"}>
            <div className="Home">
                <Carousel imagesConfig={imagesConfig}/>
                <div className="jumbotron">
                    <h1 className="display-4">Welcome, {username}</h1>
                    <p className="lead">We are very happy with your presence. You are
                        our new padawan. Come into the Star Wars universe!</p>
                    {/*<hr className="my-4"/>
                    <p>Ele usa classes utilitárias para tipografia e espaçamento de conteúdo, dentro do maior
                        container.</p>*/}
                    <Link to={routes.categories} className="btn btn-secondary btn-lg" role="button">Explore more</Link>
                </div>
            </div>
        </LayoutTemplate>
    );
};

export default Home;
