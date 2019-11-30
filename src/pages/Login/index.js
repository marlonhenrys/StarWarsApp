import React, { useState } from 'react';
import useForm from 'react-hook-form';
import {Link} from "react-router-dom";
import { usernameConfig, passwordConfig } from '../../utils/userValidationRules';
import authReducer, {login} from "../../utils/authAdministration";
import './styles.css';

const Login = (props) => {
    const { register, handleSubmit, /* watch, */ errors } = useForm();
    const onSubmit = data => authReducer( login(data) );
    const userDataState = props.location.state;
    
    return (
        <div className="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Login Form</h2>
                
                <div className="input-container"> {/* Username input */}
                    {/*<i className="fa fa-user icon"></i>*/}
                    <i className="i-username icon"></i>
                    <input className="input-field" type="text" name="username"
                            placeholder="Who are you?" ref={ register(usernameConfig) }
                            defaultValue={userDataState ? userDataState.userData.username : ""}
                            autoFocus={!userDataState}/>
                </div>

                { errors.username && /* Username error */
                    <div className="alert alert-danger">{errors.username.message}</div>
                }

                <div className="input-container"> {/* Password input */}
                    {/*<i className="fa fa-key icon"></i>*/}
                    <i className="i-password fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password"
                            placeholder="What's your password?" ref={ register(passwordConfig) }
                            autoFocus={!!userDataState}/>
                </div>

                { errors.password && /* Password error */
                    <div className="alert alert-danger">{errors.password.message}</div>
                }

                <div className="btns-login d-flex justify-content-around">
                    <Link to={"/"} className="btn links">Come back</Link>
                    <button type="submit" className="btn">Explore</button>
                </div>

                <span className={"bg-dark link-container"}>
                    <Link to={"/register"} className="links">Let me introduce my self</Link>
                </span>
            </form>
        </div>
    );
};

export default Login;
