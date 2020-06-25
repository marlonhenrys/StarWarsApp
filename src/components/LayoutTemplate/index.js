import React, { useEffect } from 'react';
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

    fixContent();
    useEffect(fixContent, []);

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
