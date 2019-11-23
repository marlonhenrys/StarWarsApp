import React from 'react';
import './styles.css';

const Login = () => {
    return (
        <div className="Login">
            <div></div>
            <form>
                <h2 className="title">Login Form</h2>
                <div class="input-container">
                    <i class="fa fa-user icon"></i>
                    <input className="input-field" type="text" name="username" placeholder="Who are you?"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password"
                            placeholder="What's your password?"/>
                </div>

                <div className="btns-login">
                    <button type="submit" class="btn">Come back</button>
                    <button type="submit" class="btn">Explore</button>
                </div>

                <a href="#" className="links">Let me introduce my self</a>
            </form>
        </div>
    );
}

export default Login;
