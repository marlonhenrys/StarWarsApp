import React, { useRef, useState } from 'react';
import useForm from 'react-hook-form';
import { Link, Redirect } from "react-router-dom";
import { usernameRegisterConfig, passwordConfig } from '../../utils/userValidationRules';
import userReducer, { addUser } from "../../utils/userAdministration";
import './styles.css';
import routes from "../../utils/routes";
import { Button } from "react-bootstrap";

const Register = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [isToRedirect, setIsToRedirect] = useState(false);
    const [userData, setUserData] = useState({});

    const redirect = () => isToRedirect ? <Redirect to={{
        pathname: '/login',
        state: { userData }
    }} /> : null;

    const onSubmit = data => {
        userReducer(addUser(data));
        setUserData(data);
        setIsToRedirect(true);
    };

    // This reference is a hook and persists during the component life cycle
    const password = useRef({});
    password.current = watch('password', ''); // Watch field value

    const passwordConfirmConfig = {
        ...passwordConfig,
        validate: value => value === password.current || "The passwords does not match."
    };

    return (
        <div className="container ">
            <div className="Register">
                {redirect()}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2 className="title">Register Form</h2>

                    <div className="input-container"> {/* Username input */}
                        {/*<i className="fa fa-user icon"></i>*/}
                        <i className="i-username icon"></i>
                        <input className="input-field" type="text" name="username"
                            placeholder="Who are you?" ref={register(usernameRegisterConfig)}
                            autoFocus />
                    </div>

                    {errors.username && /* Username error */
                        <div className="alert alert-danger">{errors.username.message}</div>
                    }

                    <div className="input-container"> {/* Password input */}
                        {/*<i className="fa fa-key icon"></i>*/}
                        <i className="i-password fa fa-key icon"></i>
                        <input className="input-field" type="password" name="password"
                            placeholder="What's your password?" ref={register(passwordConfig)} />
                    </div>

                    {errors.password && /* Password error */
                        <div className="alert alert-danger">{errors.password.message}</div>
                    }

                    <div className="input-container"> {/* Password confirm input */}
                        {/*<i className="fa fa-key icon"></i>*/}
                        <i className="i-password fa fa-key icon"></i>
                        <input className="input-field" type="password" name="password-confirm"
                            id="password-confirm" placeholder="Repeat your password"
                            ref={register(passwordConfirmConfig)} />
                    </div>

                    {errors['password-confirm'] && /* Password confirm error */
                        <div className="alert alert-danger">{errors['password-confirm'].message}</div>
                    }

                    <div className="btns-register d-flex justify-content-around">
                        <Link to={routes.index}>
                            <Button variant="light">Come back</Button>
                        </Link>
                        <Button variant="primary" type="submit" >Be a padawan</Button>
                    </div>

                    <span className={"bg-dark link-container"}>
                        <Link to={routes.login}>
                            <Button variant="secondary" size="sm">
                                You already know me
                            </Button>
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Register;
