import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./Carrito.css";

const Carrito = () => {
    const { cartItems, removeFromCart, clearCart, getCartTotal } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        // Kiosk Mode: No longer require manual login. Backend assigns Guest if missing.
        if (cartItems.length === 0) return;

        setLoading(true);
        try {
            const total = getCartTotal();

            // 1. Create Order (User is optional now)
            const userId = localStorage.getItem("userId");
            const orderPayload = {
                user: userId ? { id: parseInt(userId) } : null,
                totalAmount: total,
                notes: "Kiosko - Web Order",
                stimatedTime: 15
            };

            const order = await api.createOrder(orderPayload);
            console.log("Order created:", order.idOrder);

            // 2. Create MercadoPago Preference
            const preference = await api.createPreference(order.idOrder);
            console.log("Preference created:", preference);

            // 3. Clear Cart & Redirect
            clearCart();
            // Redirect to MercadoPago
            window.location.href = preference.init_point;

        } catch (error) {
            console.error(error);
            alert("Error al procesar el pedido: " + error.message);
            setLoading(false);
        }
    };

    return (
        <div className="carrito-container">
            <h1 className="carrito-title">Tu Pedido</h1>

            {cartItems.length === 0 ? (
                <p className="empty-cart-msg">No has agregado nada aún.</p>
            ) : (
                <div className="cart-grid">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.cartId} className="cart-item">
                                <img src={item.imageUrl} alt={item.name} className="cart-item-img" />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>S/ {item.price?.toFixed(2)}</p>
                                </div>
                                <button className="btn-remove" onClick={() => removeFromCart(item.cartId)}>
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Total: S/ {getCartTotal().toFixed(2)}</h2>
                        <button className="btn-checkout" onClick={handlePlaceOrder} disabled={loading}>
                            {loading ? "Procesando..." : "Confirmar Pedido"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
