import React from "react";
// import "./Header.css";

const Header = () => {
    return (
        <header className="w-full bg-brand-red shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex flex-col items-center justify-center py-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md mb-2 p-2">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg"
                        alt="McRonalds Logo"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h1 className="text-3xl font-extrabold text-white tracking-wide uppercase drop-shadow-md text-center">
                    ¡Bienvenido a Mc Ronald's!
                </h1>
            </div>
        </header>
    );
};

export default Header;