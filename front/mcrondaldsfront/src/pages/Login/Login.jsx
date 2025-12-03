import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = window.location.hostname === "localhost" ? "http://localhost:8080" : "https://mc-ronald-s-1.onrender.com";

        try {
            const response = await fetch(`${apiUrl}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass })
            });

            if (!response.ok) {
                alert("Credenciales incorrectas");
                return;
            }

            const data = await response.json();
            localStorage.setItem("userRole", data.role);
            onLogin(data.role);

            // Redirección basada en rol
            if (data.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/menu");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2 className="login-title">Bienvenido a McRonald's</h2>

                <div className="input-group">
                    <input type="text" required value={user} onChange={(e) => setUser(e.target.value)} placeholder="Usuario" />
                </div>
                <div className="input-group">
                    <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Contraseña" />
                </div>
                <button type="submit" className="btn-login">Iniciar Sesión</button>
                <p className="register-link" style={{ marginTop: "15px", color: "white" }}>
                    ¿No tienes cuenta? <span onClick={() => navigate("/register")} style={{ cursor: "pointer", fontWeight: "bold", textDecoration: "underline" }}>Regístrate aquí</span>
                </p>
            </form>
        </div>
    );
};

export default Login;