import React from 'react';
import './styles.css';

const Header = ({ changeTheme, darkModeActived }) => {
    return (
        <div>
            <input
                type="checkbox"
                name="darkMode"
                id="darkMode"
                checked={darkModeActived}
                onChange={() => changeTheme()}
            />
            <span> Ativar Modo Escuro</span>
        </div>
    );
}

export default Header;
