// Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo-transparent.png";
import {FaBars, FaGlobe, FaTimes} from "react-icons/fa";

interface Route {
    path: string;
    name: string;
}

interface NavbarProps {
    routes: Route[];
}

const Navbar: React.FC<NavbarProps> = ({ routes }) => {
    const [menuOpen, setMenuOpen] = useState(false);



    const home = routes.find((route) => route.name === "Home");
    const menuItems = routes.filter((route) => route.name !== "Home");

    return (
        <div className="navbar">
                <div className="menu-overlay">
                    <ul className="navbar-menu">
                        {menuItems.map((route, index) => (
                            <li key={index} className="navbar-menu-item">
                                <Link to={route.path}>
                                    {route.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            <div className="navbar-container">
                {home && (
                    <Link to={home.path}
                          className="navbar-logo-container">
                        <img src={logo} alt="LATBBQ Logo" className="navbar-logo" />
                    </Link>
                )}

                <div className="navbar-menu-icon">
                 <Link to="https://instagram.com/liveatthebbq" target="_blank">
                     <FaGlobe />
                 </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
