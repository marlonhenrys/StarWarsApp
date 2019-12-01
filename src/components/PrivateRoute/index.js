import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {isUserLogged} from "../../utils/authAdministration";
import './styles.css';
import routes from "../../utils/routes";

const PrivateRoute = (props) => (
    <Fragment>
        {/* The idea is that the children of this component are like protected routes */}
        { isUserLogged() ? props.children : <Redirect to={{
            pathname: routes.login,
            state: { authMsg: "You need to be authenticated to view this content." }
        }} /> }
    </Fragment>
);

export default PrivateRoute;
