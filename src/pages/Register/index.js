import React, {useRef} from 'react';
import useForm from 'react-hook-form';
import {Link} from "react-router-dom";
import { usernameConfig, passwordConfig } from '../../utils/userValidationRules';
import userReducer, { addUser } from "../../utils/userAdministration";
import './styles.css';

const Register = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => userReducer(addUser(data));

    // This reference is a hook and persists during the component life cycle
    const password = useRef({});
    password.current = watch('password', ''); // Watch field value

    const passwordConfirmConfig = {
        ...passwordConfig,
        validate: value => value === password.current || "The passwords does not match."
    };

    return (
        <div className="Register">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Register Form</h2>

                <div className="input-container"> {/* Username input */}
                    <i className="fa fa-user icon"></i>
                    <input className="input-field" type="text" name="username"
                            placeholder="Who are you?" ref={ register(usernameConfig) }/>
                </div>

                { errors.username && /* Username error */
                    <div className="alert alert-danger">{errors.username.message}</div>
                }

                <div className="input-container"> {/* Password input */}
                    <i className="fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password"
                            placeholder="What's your password?" ref={ register(passwordConfig) }/>
                </div>

                { errors.password && /* Password error */
                    <div className="alert alert-danger">{errors.password.message}</div>
                }

                <div className="input-container"> {/* Password confirm input */}
                    <i className="fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password-confirm"
                            id="password-confirm" placeholder="Repeat your password"
                            ref={ register(passwordConfirmConfig) }/>
                </div>

                { errors['password-confirm'] && /* Password confirm error */
                    <div className="alert alert-danger">{errors['password-confirm'].message}</div>
                }

                <div className="btns-register d-flex justify-content-around">
                    <Link to={"/"} className="btn links">Come back</Link>
                    <button type="submit" className="btn">Be a padawan</button>
                </div>

                <Link to={"/login"} className="links">You already know me</Link>
            </form>
        </div>
    );
};

export default Register;
