import React, { useState } from 'react';
import useForm from 'react-hook-form';
import {Link, Redirect} from "react-router-dom";
import { usernameConfig, passwordConfig } from '../../utils/userValidationRules';
import authReducer, {login} from "../../utils/authAdministration";
import './styles.css';
import routes from "../../utils/routes";

const Login = (props) => {
    const { register, handleSubmit, /* watch, */ errors } = useForm();
    const [ isToLogin, setIsToLogin ] = useState(false);
    const locationState = props.location.state;

    const _login = () => isToLogin ? <Redirect to={{
        pathname: routes.home
    }} /> : null;

    const onSubmit = data => {
        authReducer( login(data) );
        setIsToLogin(true);
    };

    return (
        <div className="Login">
            {_login()}
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Login Form</h2>

                { locationState && locationState.authMsg && /* Access denied error */
                    <div className="alert alert-danger">{ locationState.authMsg }</div>
                }

                <div className="input-container"> {/* Username input */}
                    {/*<i className="fa fa-user icon"></i>*/}
                    <i className="i-username icon"></i>
                    <input className="input-field" type="text" name="username"
                            placeholder="Who are you?" ref={ register(usernameConfig) }
                            defaultValue={locationState ? locationState.userData.username : ""}
                            autoFocus={!locationState}/>
                </div>

                { errors.username && /* Username error */
                    <div className="alert alert-danger">{errors.username.message}</div>
                }

                <div className="input-container"> {/* Password input */}
                    {/*<i className="fa fa-key icon"></i>*/}
                    <i className="i-password fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password"
                            placeholder="What's your password?" ref={ register(passwordConfig) }
                            autoFocus={!!locationState}/>
                </div>

                { errors.password && /* Password error */
                    <div className="alert alert-danger">{errors.password.message}</div>
                }

                <div className="btns-login d-flex justify-content-around">
                    <Link to={routes.index} className="btn links">Come back</Link>
                    <button type="submit" className="btn">Explore</button>
                </div>

                <span className={"bg-dark link-container"}>
                    <Link to={routes.register} className="links">Let me introduce my self</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
