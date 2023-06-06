import React from 'react';
import logo from "../assets/logo-transparent.png";

export const LogoFullScreen = () => {
    return (
        <div className="logo-fullscreen">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
        </div>
    )
};

export default LogoFullScreen;
