import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Combos from './pages/Combos/Combos';
import Hamburguesas from './pages/Hamburguesas/Hamburguesas';
import Bebidas from './pages/Bebidas/Bebidas';
import Login from './pages/Login/Login';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import TablaCombos from './pages/Admin/Productos/TablaCombos';
import TablaHamburguesas from './pages/Admin/Productos/TablaHamburguesas';
import TablaBebidas from './pages/Admin/Productos/TablaBebidas';
import Usuarios from './pages/Admin/Usuarios/Usuarios';
import Pedidos from './pages/Admin/Pedidos/Pedidos';
import Carrito from './pages/Carrito/Carrito';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const handleLogin = (role) => setUserRole(role);
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  // Componente para proteger rutas (Si no estás logueado, te manda al Login)
  const ProtectedRoute = ({ children }) => {
    if (!userRole) return <Navigate to="/" replace />;
    return children;
  };

  const ProtectedAdminRoute = ({ children }) => {
    if (userRole !== "ROLE_ADMIN") return <Navigate to="/" replace />;
    return children;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Combos />
              </>
            } />

            <Route path="/hamburguesas" element={
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Hamburguesas />
              </>
            } />

            <Route path="/bebidas" element={
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Bebidas />
              </>
            } />

            <Route path="/login" element={
              userRole === "ROLE_ADMIN" ? <Navigate to="/admin" /> : <Login onLogin={handleLogin} />
            } />

            <Route path="/combos" element={
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Combos />
              </>
            } />

            <Route path="/carrito" element={
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Carrito />
              </>
            } />

            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <LayoutAdmin onLogout={handleLogout} />
              </ProtectedAdminRoute>
            }>
              <Route index element={<TablaCombos />} />
              <Route path="combos" element={<TablaCombos />} />
              <Route path="hamburguesas" element={<TablaHamburguesas />} />
              <Route path="bebidas" element={<TablaBebidas />} />
              <Route path="usuarios" element={<Usuarios />} />
              <Route path="pedidos" element={<Pedidos />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;