import React from 'react';
import './styles.css';
import {Link} from "react-router-dom";
import routes from "../../utils/routes";
import authReducer, {getNameOfLoggedUser, logout} from "../../utils/authAdministration";

const Header = ({ headerTitle = "Explore this universe", changeTheme, darkModeActived }) => {
    return (
        <div className={"Header"}>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to={routes.home} className={"nav-link"}>Home</Link>
                    </li>
                </ul>

                <input
                    type="checkbox"
                    name="darkMode"
                    id="darkMode"
                    checked={darkModeActived}
                    onChange={() => changeTheme()}
                />
                <label for={"darkMode"}>Ativar Modo Escuro</label>

                <a className="navbar-brand" href="#">{headerTitle}</a>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className={"nav-link"}>{getNameOfLoggedUser()}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"}>|</Link>
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
