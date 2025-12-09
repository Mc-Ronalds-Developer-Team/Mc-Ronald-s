import React from "react";
// import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ onLogout, userRole }) => {
    // Helper helper class for links
    const linkClasses = ({ isActive }) =>
        `px-6 py-4 font-bold text-lg transition-colors duration-200 border-b-4 h-full flex items-center ${isActive
            ? "text-brand-red border-brand-red bg-yellow-50"
            : "text-gray-600 border-transparent hover:text-brand-red hover:bg-gray-50"
        }`;

    return (
        <nav className="bg-white shadow-md sticky top-[64px] z-40 w-full border-t border-gray-100">
            <div className="container mx-auto px-4">
                {/* Changed to flex-nowrap to enforce single row */}
                <ul className="flex flex-row flex-nowrap justify-center items-center list-none m-0 h-16 overflow-x-auto">
                    <li className="flex-shrink-0 h-full flex items-center">
                        <NavLink to="/combos" className={linkClasses}>
                            Combos
                        </NavLink>
                    </li>
                    <li className="flex-shrink-0 h-full flex items-center">
                        <NavLink to="/hamburguesas" className={linkClasses}>
                            Hamburguesas
                        </NavLink>
                    </li>
                    <li className="flex-shrink-0 h-full flex items-center">
                        <NavLink to="/bebidas" className={linkClasses}>
                            Bebidas
                        </NavLink>
                    </li>

                    {/* Botón Siguiente / Mi Pedido */}
                    <li className="ml-8 flex-shrink-0 h-full flex items-center">
                        <NavLink
                            to="/carrito"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-6 py-2 rounded-full font-extrabold text-white transition-transform transform hover:scale-105 shadow-md ${isActive ? "bg-brand-red ring-4 ring-brand-yellow" : "bg-brand-red hover:bg-red-700"
                                }`
                            }
                        >
                            {/* Emoji removed */}
                            <span>Mi Pedido</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
