import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from "../Header";
import SideNav from "../SideNav";
import $ from 'jquery';

const fixContent = () => {
    const documentHeight = $(document).height();
    const headerHeight = $('.Header').height();
    $('.LayoutTemplate .template-content').height(documentHeight - headerHeight);
};

$(document).resize(fixContent);
$(document).ready(fixContent);

const LayoutTemplate = ({ headerTitle, children, darkModeActived, changeTheme }) => {

    // const [darkModeActived, setDarkModeActived] = useState(false);

    fixContent();
    useEffect(fixContent, []);

    // useEffect(() => {
    //     const root = document.documentElement;

    //     if (darkModeActived) {
    //         root.style.setProperty('--color-bg-main', '#000');
    //         root.style.setProperty('--color-bg-items', '#444');
    //         root.style.setProperty('--color-font-standard', '#FFF');
    //         root.style.setProperty('--color-font-feature', 'rgb(231, 212, 28)');
    //     } else {
    //         root.style.setProperty('--color-bg-main', '#CCC');
    //         root.style.setProperty('--color-bg-items', '#FFF');
    //         root.style.setProperty('--color-font-standard', '#000');
    //         root.style.setProperty('--color-font-feature', 'rgb(88, 90, 155)');
    //     }
    // }, [darkModeActived]);

    return (
        <div className="LayoutTemplate">
            <Header
                headerTitle={headerTitle}
                darkModeActived={darkModeActived}
                changeTheme={changeTheme}
            />
            <SideNav
                darkModeActived={darkModeActived}
                changeTheme={changeTheme}
            />
            <div className={"template-content"}>
                <div className={"inner-template-content"}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutTemplate;
