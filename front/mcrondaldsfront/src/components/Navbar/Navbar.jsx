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
                    
                    {userRole && (
                        <li className="list__item">
                            <button 
                                onClick={onLogout} 
                                className="list__link" 
                                style={{ background: "transparent", border: "none", cursor: "pointer", color: "inherit", font: "inherit" }}
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;