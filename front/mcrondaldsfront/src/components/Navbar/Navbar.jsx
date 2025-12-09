import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = ({ onLogout, userRole }) => {

    return (
        <nav className="navbar__container">
            <div className="navbar">
                <ul className="nav__list">
                    <li className="list__item">
                        <NavLink to="/combos" className={({ isActive }) => isActive ? "list__link active" : "list__link"}>
                            Combos
                        </NavLink>
                    </li>
                    <li className="list__item">
                        <NavLink to="/hamburguesas" className={({ isActive }) => isActive ? "list__link active" : "list__link"}>
                            Hamburguesas
                        </NavLink>
                    </li>
                    <li className="list__item">
                        <NavLink to="/bebidas" className={({ isActive }) => isActive ? "list__link active" : "list__link"}>
                            Bebidas
                        </NavLink>
                    </li>

                    {/* Botón Siguiente / Mi Pedido */}
                    <li className="list__item">
                        <NavLink to="/carrito" className={({ isActive }) => isActive ? "list__link active" : "list__link"} style={{ color: "#da291c", borderColor: "#da291c", fontWeight: "800" }}>
                            🛒 Mi Pedido
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;