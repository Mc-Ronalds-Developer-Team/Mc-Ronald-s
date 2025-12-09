import React from "react";
// import "./Header.css";

const Header = () => {
    return (
        <header className="w-full bg-brand-red shadow-lg sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto flex items-center justify-center h-14">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
                    alt="McRonalds Logo"
                    className="h-10 w-auto object-contain filter drop-shadow-md hover:scale-110 transition-transform duration-300"
                />
            </div>
        </header>
    );
};

export default Header;