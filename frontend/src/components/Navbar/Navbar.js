import React from "react";
import "./Navbar.css";
import NavButton from "../NavButton/NavButton.js";


const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <ul>
                    <li className="title">
                        <span>
                            <a href="/">Sprawball</a>
                        </span>
                    </li>
                    <li>
                        <NavButton url="account">
                            Account
                        </NavButton>
                    </li>
                    <li>
                        <NavButton url="insert">
                            Insert
                        </NavButton>
                    </li>
                    <li>
                        <NavButton url="search">
                            Search
                        </NavButton>
                    </li>
                    <li>
                        <NavButton url="shots">
                            Shot Chart
                        </NavButton>
                    </li>
                </ul>
            </nav>
            <nav className="mobile">
                <ul>
                    <li className="title">
                        <span>
                            <a href="/">Sprawball</a>
                        </span>
                    </li>
                    <li>
                        <NavButton url="search">
                            Search
                        </NavButton>
                    </li>
                </ul>
            </nav>
        </>
    );
};

export default Navbar;