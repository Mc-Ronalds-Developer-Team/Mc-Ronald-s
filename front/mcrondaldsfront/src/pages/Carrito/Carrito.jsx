import React, { useContext } from "react";
import "./Carrito.css";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { CartContext } from "../../context/CartContext";

const Carrito = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className="flex">
      <Header />
      <Navbar />

      <div className="carrito-content">
        <h1 className="carrito-title">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
        ) : (
          <>
            <table className="tabla-carrito">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio (S/.)</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nombre}</td>
                    <td>{item.precio.toFixed(2)}</td>
                    <td>{item.cantidad}</td>
                    <td>{(item.precio * item.cantidad).toFixed(2)}</td>
                    <td>
                      <button className="btn-eliminar" onClick={() => removeFromCart(item.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="carrito-total">
              <p>Total: <strong>S/. {total.toFixed(2)}</strong></p>
              <button className="btn-vaciar" onClick={clearCart}>Vaciar Carrito</button>
              <button className="btn-pagar">Ir a Pagar</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carrito;
