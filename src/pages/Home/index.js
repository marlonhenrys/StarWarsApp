import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';

const Home = ({ darkModeActived, changeTheme }) => {
    return (
        <LayoutTemplate darkModeActived={darkModeActived} changeTheme={changeTheme} >
            <div className="Home">
                Home :)
            </div>
        </LayoutTemplate>
    );
};

export default Home;
