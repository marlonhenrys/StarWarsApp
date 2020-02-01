import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Link, Redirect } from "react-router-dom";
import { usernameLoginConfig, passwordConfig } from '../../utils/userValidationRules';
import authReducer, { login } from "../../utils/authAdministration";
import './styles.css';
import routes from "../../utils/routes";
import { Button } from "react-bootstrap";

const Login = (props) => {
    const { register, handleSubmit, /* watch, */ errors } = useForm();
    const [isToLogin, setIsToLogin] = useState(false);
    const [loginErrorMsg, setLoginErrorMsg] = useState(null);
    const locationState = props.location.state;
    const locationStateHasMsg = locationState && locationState.authMsg;
    const locationStateHasUserData = locationState && locationState.userData;
    const hasLoginErrorMsg = loginErrorMsg;

    const _login = () => isToLogin ? <Redirect to={{
        pathname: routes.home
    }} /> : null;

    const onSubmit = data => {
        const loginAction = login(data);
        authReducer(loginAction);

        if (loginAction.user.exists) setIsToLogin(true);
        else setLoginErrorMsg("Username or password invalid");
    };

    return (
        <div className="container">
            <div className="Login">
                {_login()}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title">Login Form</h2>

                    {hasLoginErrorMsg && /* Access denied error */
                        <div className="alert alert-danger">{loginErrorMsg}</div>
                    }

                    {!hasLoginErrorMsg && locationStateHasMsg && /* Access denied error */
                        <div className="alert alert-danger">{locationState.authMsg}</div>
                    }

                    <div className="input-container"> {/* Username input */}
                        {/*<i className="fa fa-user icon"></i>*/}
                        <i className="i-username icon"></i>
                        <input className="input-field" type="text" name="username"
                            placeholder="Who are you?" ref={register(usernameLoginConfig)}
                            defaultValue={locationStateHasUserData ?
                                locationState.userData.username : ""}
                            autoFocus={!locationStateHasUserData} />
                    </div>

                    {errors.username && /* Username error */
                        <div className="alert alert-danger">{errors.username.message}</div>
                    }

                    <div className="input-container"> {/* Password input */}
                        {/*<i className="fa fa-key icon"></i>*/}
                        <i className="i-password fa fa-key icon"></i>
                        <input className="input-field" type="password" name="password"
                            placeholder="What's your password?" ref={register(passwordConfig)}
                            autoFocus={locationStateHasUserData} />
                    </div>

                    {errors.password && /* Password error */
                        <div className="alert alert-danger">{errors.password.message}</div>
                    }

                    <div className="btns-login d-flex justify-content-around">
                        <Link to={routes.index}>
                            <Button variant="light">Come back</Button>
                        </Link>
                        <Button variant="primary" type="submit" >Explore</Button>
                    </div>

                    <div>
                        <Link to={routes.register}>
                            <Button variant="secondary" size="sm">
                                Let me introduce myself
                            </Button>
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;
