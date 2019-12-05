import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import authReducer, { getNameOfLoggedUser, logout } from "../../utils/authAdministration";

const Header = ({ headerTitle = "Explore this universe" }) => {

    const title = headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1);

    return (
        <div className="Header">
            <nav className="navbar navbar-expand-sm bg-color">

                <span className="navbar-brand">{title}</span>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link disabled to={"#"} className={"nav-link"}>{getNameOfLoggedUser()}</Link>
                    </li>
                    <li className="nav-item">
                        <Link disabled to={"#"} className={"nav-link"}>&#10140;</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={routes.login} className={"nav-link"}
                            onClick={() => authReducer(logout())}>Logout</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
