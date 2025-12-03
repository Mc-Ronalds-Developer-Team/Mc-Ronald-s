import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Register/Register.css"; // Reusamos el CSS del Login para que se vea igual

const Register = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        
        // URL inteligente (Local o Producción)
        const apiUrl = window.location.hostname === "localhost" 
            ? "http://localhost:8080" 
            : "https://mc-ronald-s-1.onrender.com";

        try {
            const response = await fetch(`${apiUrl}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass })
            });

            if (response.ok) {
                alert("Usuario creado con éxito. Ahora inicia sesión.");
                navigate("/"); // Te manda al Login
            } else {
                alert("Error: El usuario ya existe o datos inválidos.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error de conexión");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleRegister}>
                <h2 className="login-title">Crear Cuenta</h2>
                
                <div className="input-group">
                    <input type="text" required value={user} onChange={(e) => setUser(e.target.value)} placeholder="Elige un Usuario" />
                </div>
                <div className="input-group">
                    <input type="password" required value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Elige una Contraseña" />
                </div>

                <button type="submit" className="btn-login">Registrarse</button>
                
                <p className="register-link">
    ¿Ya tienes cuenta? <span onClick={() => navigate("/")}>Inicia Sesión</span>
</p>
            </form>
        </div>
    );
};

export default Register;