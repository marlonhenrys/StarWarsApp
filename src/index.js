import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './pages/Register';
import Login from './pages/Login';
import {HashRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Error404 from "./pages/Error404";

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route path={"/"} exact={true} component={App}/>
            <Route path={"/login"} exact={true} component={Login}/>
            <Route path={"/register"} exact={true} component={Register}/>
            <Route path={"*"} component={Error404}/>
        </Switch>
    </HashRouter>,
    document.getElementById('root')
);
