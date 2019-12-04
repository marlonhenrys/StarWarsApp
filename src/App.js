import React, { useState, useEffect } from 'react';

import './styles.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import routes from "./utils/routes";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Error404 from "./pages/Error404";

const App = () => {

    /*const [darkModeActived, setDarkModeActived] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (darkModeActived) {
            root.style.setProperty('--color-bg-main', '#000');
            root.style.setProperty('--color-bg-items', '#444');
            root.style.setProperty('--color-font-standard', '#FFF');
            root.style.setProperty('--color-font-feature', 'rgb(231, 212, 28)');
        } else {
            root.style.setProperty('--color-bg-main', '#CCC');
            root.style.setProperty('--color-bg-items', '#FFF');
            root.style.setProperty('--color-font-standard', '#000');
            root.style.setProperty('--color-font-feature', 'rgb(88, 90, 155)');
        }
    }, [darkModeActived]);*/

    return (
        <HashRouter>
            <Switch>
                <Route path={routes.index} exact={true} component={Index}/>
                <Route path={routes.login} exact={true} component={Login}/>
                <Route path={routes.register} exact={true} component={Register}/>
                <PrivateRoute>
                    <Route path={routes.home} exact={true} component={Home}/>
                </PrivateRoute>
                <Route path={"*"} component={Error404}/>
            </Switch>
        </HashRouter>
    );
};

export default App;
