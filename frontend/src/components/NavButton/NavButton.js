import React from "react";
import "./NavButton.css";
import { PropTypes } from "prop-types";
import { useLocation } from "react-router-dom";



const NavButton = (props) => {

    const location = useLocation();
    const page = location.pathname.substring(location.pathname.lastIndexOf("/") + 1, location.pathname.length);
  
    return (
        <div
            className={
                page === props.url ? "navbutton active" : "navbutton"
            }>
            <a href={props.url}>{props.children}</a>
        </div>
    );
};

NavButton.propTypes = {
    children: PropTypes.string,
    url: PropTypes.string,
};

export default NavButton;