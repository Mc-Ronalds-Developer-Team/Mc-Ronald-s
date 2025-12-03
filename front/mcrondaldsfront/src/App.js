import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Combos from './pages/Combos/Combos';
import Login from './pages/Login/Login';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  const ProtectedAdminRoute = ({ children }) => {
    if (userRole !== "ADMIN") {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={
              
              <>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <div className="flex">
              <Combos className="flex-item combos" />
              </div>
              </>
            } />

            <Route path="/combos" element={
              <>
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Combos />
              </>
            } />

            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Rutas Privadas de Admin */}
            <Route path="/admin/*" element={
              <ProtectedAdminRoute>
                <LayoutAdmin onLogout={handleLogout} />
              </ProtectedAdminRoute>
            } />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;