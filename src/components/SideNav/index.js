import React from 'react';
import {Link} from "react-router-dom";
import $ from 'jquery';
import './styles.css';
import routes from "../../utils/routes";

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});

const SideNav = () => {
    const categories = [
        { name: 'People', url: routes.people, icon: '' },
        { name: 'Films', url: routes.films, icon: '' },
        { name: 'Starships', url: routes.starships, icon: '' },
        { name: 'Vehicles', url: routes.vehicles, icon: '' },
        { name: 'Species', url: routes.species, icon: '' },
        { name: 'Planets', url: routes.planets, icon: '' },
    ];

    return (
        <div className="SideNav wrapper">
            <nav id="sidebar">
                <div className="sidebar-header">
                    <div className={"navbar-img"}/>
                </div>

                <ul className="list-unstyled components">
                    {categories.map(
                        (category) =>
                            <li key={category.url} className="active category-link-container">
                                <Link to={category.url}>
                                    <i className={"fas " + category.icon}/>
                                    {category.name}
                                </Link>
                            </li>
                    )}
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
        </div>
    );
};

export default SideNav;
