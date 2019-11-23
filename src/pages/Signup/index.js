import React from 'react';
import './styles.css';

const Signup = () => {
    return (
        <div className="Signup">
            <div></div>
            <form>
                <h2 className="title">Register Form</h2>
                <div class="input-container">
                    <i class="fa fa-user icon"></i>
                    <input className="input-field" type="text" name="username" placeholder="Who are you?"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password"
                            placeholder="What's your password?"/>
                </div>

                <div class="input-container">
                    <i class="fa fa-key icon"></i>
                    <input className="input-field" type="password" name="password-confirm"
                            id="password-confirm" placeholder="Repeat your password"/>
                </div>

                <div className="btns-signup">
                    <button type="submit" class="btn">Come back</button>
                    <button type="submit" class="btn">Be a padawan</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
