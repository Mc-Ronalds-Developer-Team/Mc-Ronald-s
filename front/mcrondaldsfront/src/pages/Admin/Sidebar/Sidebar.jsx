import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
    return (
        <aside className="sidebar">
            <h2 className="sidebar__title">Admin Panel</h2>

            <ul className="sidebar__menu">
                <li>
                    <NavLink to="/admin/productos" className={({ isActive }) => isActive ? "sidebar__link active" : "sidebar__link"}>
                        Productos
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/usuarios" className={({ isActive }) => isActive ? "sidebar__link active" : "sidebar__link"}>
                        Usuarios
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/pedidos" className={({ isActive }) => isActive ? "sidebar__link active" : "sidebar__link"}>
                        Pedidos
                    </NavLink>
                </li>

                <li style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "10px" }}>
                    <button 
                        onClick={onLogout} 
                        className="sidebar__link"
                        style={{ background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left" }}
                    >
                        Cerrar Sesión
                    </button>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;