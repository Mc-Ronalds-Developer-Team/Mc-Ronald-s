import React from "react";
// import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ onLogout, userRole }) => {
    // Helper helper class for links
    const linkClasses = ({ isActive }) =>
        `px-6 py-3 font-bold text-lg transition-colors duration-200 border-b-4 ${isActive
            ? "text-brand-red border-brand-red bg-yellow-50"
            : "text-gray-600 border-transparent hover:text-brand-red hover:bg-gray-50"
        }`;

    return (
        <nav className="bg-white shadow-md sticky top-[160px] z-40 w-full border-t border-gray-100">
            <div className="container mx-auto px-4">
                <ul className="flex flex-wrap justify-center items-center gap-4 py-2 list-none m-0">
                    <li>
                        <NavLink to="/combos" className={linkClasses}>
                            Combos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/hamburguesas" className={linkClasses}>
                            Hamburguesas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/bebidas" className={linkClasses}>
                            Bebidas
                        </NavLink>
                    </li>

                    {/* Botón Siguiente / Mi Pedido */}
                    <li className="ml-4">
                        <NavLink
                            to="/carrito"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-6 py-2 rounded-full font-extrabold text-white transition-transform transform hover:scale-105 shadow-md ${isActive ? "bg-brand-red ring-4 ring-brand-yellow" : "bg-brand-red hover:bg-red-700"
                                }`
                            }
                        >
                            <span>🛒</span>
                            <span>Mi Pedido</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;