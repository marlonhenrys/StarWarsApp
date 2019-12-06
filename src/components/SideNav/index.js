import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import $ from 'jquery';
import './styles.css';
import routes from "../../utils/routes";
import lightsaberlight from "../../assets/icons/icons8-lightsaber-light.svg";
import lightsaberdark from "../../assets/icons/icons8-lightsaber-dark.svg";
// import milleniumfacon from "../../assets/icons/ic_starwars_icons_millenniumfalcon.xml";
// import r2d2 from "../../assets/icons/ic_starwars_icons_r2d2.xml";
// import people from "../../assets/icons/ic_starwars_people_chewbacca.xml";
// import deathstar from "../../assets/icons/ic_starwars_planets_deathstar.xml";
// import title from " ../../assets/icons/ic_starwars_title_title.xml";
// import vehicle from "../../assets/icons/ic_starwars_vehicle_vehicle.xml";
// import milleniumfalcon2 from  "../../assets/icons/starwars_icons_millenniumfalcon.xml";
import { Button } from "react-bootstrap";
import categories from '../../utils/categories';

const fixSideBar = () => {
    const documentHeight = $(document).height();
    $('#sidebar').height(documentHeight);
};

$(document).resize(fixSideBar);
$(document).ready(
    () => {
        fixSideBar();
        $('#sidebarCollapse').click(() => $('#sidebar').toggleClass('active'));
    }
);

const SideNav = ({ changeTheme, darkModeActived }) => {

    // fixSideBar();
    useEffect(() => fixSideBar(), []);

    return (
        <aside className="SideNav wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <div className={"navbar-img"} />
                </div>

                <ul className="list-unstyled components">
                    <li key={routes.home} className="active category-link-container">
                        <Link to={routes.home}>
                            Home
                        </Link>
                    </li>
                    {categories.map(
                        (category) =>
                            <li key={category.url} className="active category-link-container">
                                <Link to={category.url}>
                                    <i className={"fas " + category.icon} />
                                    {category.name}
                                </Link>
                            </li>
                    )}
                    <li>
                        <div className="round">
                            <button 
                                className="button-change-light"
                                variant="outline-dark" 
                                onClick={() => changeTheme()} 
                                type="checkbox"
                                name="darkMode"
                                id="checkbox"
                                checked={darkModeActived}
                            >
                                {darkModeActived ? <img src={lightsaberlight} alt="Light lightsaber" /> : <img src={lightsaberdark} alt="Dark lightsaber" />}
                            </button>
                        </div>

                    </li>
                </ul>

            </nav>

            {/*<div id="content">
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button type="button" id="sidebarCollapse" className="btn btn-info">
                <i className="fas fa-align-left"></i>
                <span>Toggle Sidebar</span>
            </button>
        </div>
    </nav>
</div>*/}
        </aside>

    );
};

export default SideNav;
