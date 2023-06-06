import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Route {
    path: string;
    name: string;
}

interface NavbarProps {
    routes: Route[];
}

const Navbar: React.FC<NavbarProps> = ({ routes }) => {
    const [showArchive, setShowArchive] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    const toggleArchive = () => {
        setShowArchive(!showArchive);
    };

    const handleClick = (name: string) => {
        setActiveItem(name);
    };

    return (
        <div className="navbar-container">
            <ul className="navbar-list">
                {routes.map((route, index) => {
                    if (route.name === 'Videos' || route.name === 'Photos' || route.name === 'Past Events') {
                        return null;
                    }
                    const isActive = activeItem === route.name;
                    if (route.name === 'Events') {
                        return (
                            <>
                                <li key={index} className={`navbar-list-item ${isActive ? 'active' : ''}`}>
                                    <Link to={route.path} onClick={() => handleClick(route.name)}>
                                        {route.name}
                                    </Link>
                                </li>
                                <li key="archive" className="navbar-list-item">
                                    <span onClick={toggleArchive}>Archive</span>
                                    {showArchive && (
                                        <ul className="submenu">
                                            {routes.map((subRoute, subIndex) => {
                                                if (
                                                    subRoute.name === 'Videos' ||
                                                    subRoute.name === 'Photos' ||
                                                    subRoute.name === 'Past Events'
                                                ) {
                                                    return (
                                                        <li key={subIndex}
                                                            className={`navbar-list-item ${
                                                                activeItem === subRoute.name ? 'active' : ''
                                                            }`}
                                                        >
                                                            <Link to={subRoute.path}
                                                                onClick={() => handleClick(subRoute.name)}
                                                            >
                                                                {subRoute.name}
                                                            </Link>
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </ul>
                                    )}
                                </li>
                            </>
                        );
                    }

                    return (
                        <li
                            key={index}
                            className={`navbar-list-item ${isActive ? 'active' : ''}`}
                        >
                            <Link
                                to={route.path}
                                onClick={() => handleClick(route.name)}
                            >
                                {route.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Navbar;
