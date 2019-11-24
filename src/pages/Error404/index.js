import React from 'react';
import {Link} from "react-router-dom";

function Error404() {
    return (
        <div className="Error404">
            <h1>Page not found</h1>
            <br/>
            <Link to={"/"}>
                {/*<span className="icon">
                    <i className="fa fa-long-arrow-left"/>
                </span>*/}

                <span>Back</span>
            </Link>
        </div>
    );
}

export default Error404;
