import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Componentes del cliente
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Combos from "./pages/Combos/Combos";
import Carrito from "./pages/Carrito/Carrito";

// Componentes del Admin
import LayoutAdmin from "./pages/Admin/LayoutAdmin";
import Productos from "./pages/Admin/Productos/Productos";
import Platos from "./pages/Admin/Platos/Platos";

// Login
import Login from "./pages/Login/Login";

// Contexto del carrito
import { CartProvider } from "./context/CartContext";

function App() {
  const [role, setRole] = useState(null);

  return (
    <CartProvider>
      <Routes>

        {/* VISTAS DEL CLIENTE */}
        <Route
          path="/"
          element={
            <div className="flex">
              <Header className="flex-item header" />
              <Navbar className="flex-item navbar" />
              <Combos className="flex-item combos" />
            </div>
          }
        />
        <Route path="/carrito" element={<Carrito />} />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login onLogin={(r) => setRole(r)} />}
        />

        {/* ADMIN */}
        <Route
          path="/admin/*"
          element={
            role === "ADMIN" ? (
              <LayoutAdmin />
            ) : (
              <Navigate to="/login" />
            )
          }
        >
          <Route path="productos" element={<Productos />} />
          <Route path="platos" element={<Platos />} />
        </Route>

      </Routes>
    </CartProvider>
  );
}

export default App;
