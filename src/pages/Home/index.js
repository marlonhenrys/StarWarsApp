import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';
import lukeSkyWalker from '../../assets/carousel/starwars_people_lukeskywalker.png';
import tethTve from '../../assets/carousel/starwars_planets_tethtve.png';
import millennium from '../../assets/carousel/starwars_spaceship_millenniumfalcon.png';
import films from '../../assets/carousel/starwars_films_right_order.jpg';
import top_10_species from '../../assets/carousel/starwars_species_top_10.jpg';
import fifty_vehicles from '../../assets/carousel/starwars_vehicles_fifty.png';
import twelve_planets from '../../assets/carousel/starwars_planets_twelve.jpg';
import Carousel from "../../components/Carousel";
import { getNameOfLoggedUser } from "../../utils/authAdministration";
import { Link } from "react-router-dom";
import routes from "../../utils/routes";

const imagesConfig = [
    {
        src: lukeSkyWalker,
        title: 'People',
        paragraph: '',
        alt: 'People category',
        route: routes.people,
    },
    {
        src: films,
        title: 'Films',
        paragraph: '',
        alt: 'Films category',
        route: routes.films,
    },
    {
        src: millennium,
        title: 'Starships',
        paragraph: '',
        alt: 'Starships category',
        route: routes.starships,
    },
    {
        src: fifty_vehicles,
        title: 'Vehicles',
        paragraph: '',
        alt: 'Vehicles category',
        route: routes.vehicles,
    },
    {
        src: top_10_species,
        title: 'Species',
        paragraph: '',
        alt: 'Species category',
        route: routes.species,
    },
    {
        // src: tethTve,
        src: twelve_planets,
        title: 'Planets',
        paragraph: '',
        alt: 'Planets category',
        route: routes.planets,
    },
];

const Home = ({ darkModeActived, changeTheme }) => {
    const username = getNameOfLoggedUser();

    return (
        <LayoutTemplate darkModeActived={darkModeActived} changeTheme={changeTheme} >
            <div className="Home">
                <Carousel imagesConfig={imagesConfig} />
                <div className="jumbotron">
                    <h1 className="display-4">Welcome, {username}</h1>
                    <p className="lead">We are very happy with your presence. You are
                        now our new padawan. Come into the Star Wars universe!</p>
                    {/*<hr className="my-4"/>
                    <p>Ele usa classes utilitárias para tipografia e espaçamento de conteúdo, dentro do maior
                        container.</p>*/}
                    <Link to={routes.people} className="btn btn-color btn-lg" role="button">Explore more</Link>
                </div>
            </div>
        </LayoutTemplate>
    );
};

export default Home;
