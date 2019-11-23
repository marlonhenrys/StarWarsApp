import React, { useRef } from 'react';
import useForm from 'react-hook-form';
import { usernameConfig, passwordConfig } from '../../utils/userValidationRules';
import './styles.css';

const Signup = () => {
    const { register, handleSubmit, watch, errors } = useForm()
    const onSubmit = data => console.log('submit event!');

    const password = useRef({}); // This reference persist during the component life cycle
    password.current = watch('password', ''); // Watch field value

    const passwordConfirmConfig = {
        ...passwordConfig,
        validate: value => {
            return {
                value: value === password.current,
                message: "The passwords does not match.",
            };
        }
    };

    // console.log(watch('username'));

    return (
        <div className="Signup">
            <div></div>
            <form>
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

                { errors.password && /* Password confirm error */
                    <div className="alert alert-danger">{errors.passwordConfirm.message}</div>
                }

                <div className="btns-signup">
                    <button type="submit" className="btn">Come back</button>
                    <button type="submit" className="btn">Be a padawan</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
