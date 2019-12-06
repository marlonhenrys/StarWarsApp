import React from 'react';
import './styles.css';
import { Link } from "react-router-dom";
import routes from "../../utils/routes";
import authReducer, { getNameOfLoggedUser, logout } from "../../utils/authAdministration";
import categories from '../../utils/categories';
import lightsaberlight from "../../assets/icons/icons8-lightsaber-light.svg";
import lightsaberdark from "../../assets/icons/icons8-lightsaber-dark.svg";

const Header = ({ headerTitle = "Explore this universe", darkModeActived, changeTheme }) => {

    const title = headerTitle.charAt(0).toUpperCase() + headerTitle.slice(1);

    return (
        <div className="Header">
            <nav className="navbar navbar-expand-lg navbar-dark bg-color">
                <span className="navbar-brand">{title}</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link disabled to={"#"} className={"nav-link"}>
                                {getNameOfLoggedUser()}<span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item pipe">
                            <Link disabled to={"#"} className={"nav-link"}> | </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={routes.login} className={"nav-link"}
                                    onClick={() => authReducer(logout())}>Logout</Link>
                        </li>
                        <li className="nav-item toggle-lg">
                            <div key={routes.home} className="active category-link-container">
                                <Link to={routes.home}>
                                    Home
                                </Link>
                            </div>
                            {categories.map(
                                (category) =>
                                    <div key={category.url} className="active category-link-container">
                                        <Link to={category.url}>
                                            <i className={"fas " + category.icon} />
                                            {category.name}
                                        </Link>
                                    </div>
                            )}
                            <div>
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

                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
            {/* <nav className="navbar navbar-dark navbar-expand-sm bg-color">
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <span className="navbar-brand">{title}</span>

                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link disabled to={"#"} className={"nav-link"}>{getNameOfLoggedUser()}</Link>
                        </li>
                        <li className="nav-item">
                            <Link disabled to={"#"} className={"nav-link"}> | </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={routes.login} className={"nav-link"}
                                onClick={() => authReducer(logout())}>Logout</Link>
                        </li>
                    </ul>
                </div>
            </nav> */}
        </div>
    );
};

export default Header;
