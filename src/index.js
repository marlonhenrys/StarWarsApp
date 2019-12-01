import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import {HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Error404 from "./pages/Error404";
import Index from './pages/Index';
import routes from "./utils/routes";
import './styles.css';
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";

ReactDOM.render(
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
    </HashRouter>,
    document.getElementById('root')
);
