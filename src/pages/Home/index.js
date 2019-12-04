import React from 'react';
import LayoutTemplate from "../../components/LayoutTemplate";
import './styles.css';

const Home = () => {
    return (
        <LayoutTemplate headerTitle={"Explore this universe"}>
            <div className="Home">
                Home :)
            </div>
        </LayoutTemplate>
    );
};

export default Home;
