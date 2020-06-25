import React, { useState, useEffect } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import routes from "./utils/routes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";
import Category from "./pages/Category";
import Item from "./pages/Item";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './styles.css';
import APIContextProvider from './contexts/APIContext';

const App = () => {
    const [darkModeActived, setDarkModeActived] = useState(false);

    useEffect(() => {
        setTimeout(() => setDarkModeActived(true), 300)
    }, []);

    useEffect(() => {
        const root = document.documentElement;

        if (darkModeActived) {
            root.style.setProperty('--color-bg-main', '#222');
            root.style.setProperty('--color-bg-items', '#444');
            root.style.setProperty('--color-font-standard', '#FFF');
            root.style.setProperty('--color-font-feature', 'rgb(231, 212, 28)');
        } else {
            root.style.setProperty('--color-bg-main', '#CCC');
            root.style.setProperty('--color-bg-items', '#FFF');
            root.style.setProperty('--color-font-standard', '#000');
            root.style.setProperty('--color-font-feature', 'rgb(88, 90, 155)');
        }
    }, [darkModeActived]);

    const changeTheme = () => setDarkModeActived(!darkModeActived);

    return (
        <APIContextProvider>
            <HashRouter>
                <Switch>
                    <Route path={routes.index} exact={true} component={Index} />
                    <Route path={routes.login} exact={true} component={Login} />
                    <Route path={routes.register} exact={true} component={Register} />
                    <PrivateRoute path={routes.home} exact={true}
                        component={(props) =>
                            <Home {...props} darkModeActived={darkModeActived} changeTheme={changeTheme} />}
                    />
                    <PrivateRoute path={routes.genericCategory} exact={true}
                        component={(props) =>
                            <Category {...props} darkModeActived={darkModeActived} changeTheme={changeTheme} />}
                    />
                    <PrivateRoute path={routes.genericItem} exact={true}
                        component={(props) =>
                            <Item {...props} darkModeActived={darkModeActived} changeTheme={changeTheme} />}
                    />
                    <Route path={"*"} component={Error404} />
                </Switch>
            </HashRouter>
        </APIContextProvider>
    );
};

export default App;
