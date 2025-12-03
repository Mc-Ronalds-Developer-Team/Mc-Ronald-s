import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';
import Combos from './pages/Combos/Combos';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Hamburguesas from './pages/Hamburguesas/Hamburguesas';
import LayoutAdmin from './pages/Admin/LayoutAdmin';
import Productos from './pages/Admin/Productos/Productos'; // Asegúrate de que esta ruta exista
import Cart from './pages/Cart/Cart'; // Asegúrate de que esta ruta exista
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  const handleLogin = (role) => setUserRole(role);
  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
  };

  const ProtectedRoute = ({ children }) => {
    if (!userRole) return <Navigate to="/" replace />;
    return children;
  };

  const ProtectedAdminRoute = ({ children }) => {
    if (userRole !== "ADMIN") return <Navigate to="/menu" replace />;
    return children;
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={ 
              userRole ? <Navigate to="/menu" /> : <Login onLogin={handleLogin} /> 
            } />
            <Route path="/register" element={<Register />} />
            
            {/* Ruta del Menú (Cliente) */}
            <Route path="/menu" element={
              <ProtectedRoute>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Hamburguesas />
                <Combos />
              </ProtectedRoute>
            } />
            
            <Route path="/combos" element={
              <ProtectedRoute>
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Combos />
              </ProtectedRoute>
            } />

            <Route path="/cart" element={
              <ProtectedRoute>
                <Header />
                <Navbar onLogout={handleLogout} userRole={userRole} />
                <Cart />
              </ProtectedRoute>
            } />

            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <LayoutAdmin onLogout={handleLogout} />
              </ProtectedAdminRoute>
            }>
               <Route path="productos" element={<Productos />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;