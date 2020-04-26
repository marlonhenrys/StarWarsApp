import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isUserLogged } from "../../utils/authAdministration";
import "./styles.css";
import routes from "../../utils/routes";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isUserLogged() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routes.login,
            state: {
              authMsg: "You need to be authenticated to view this content.",
            },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
