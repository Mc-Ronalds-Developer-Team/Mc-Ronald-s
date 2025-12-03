import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

// IMPORTANTE: Aquí debes poner tu PUBLIC KEY real de MercadoPago.
// La que tienes en application.properties (APP_USR-733...) es el ACCESS TOKEN (Privado).
// La Public Key suele empezar por "TEST-" o "APP_USR-" pero es diferente.
// Búscala en tu Dashboard de MercadoPago -> Credenciales.
initMercadoPago('TU_PUBLIC_KEY_REAL_AQUI', { locale: 'es-PE' });

const Cart = () => {
    const { cartItems, removeFromCart, total, clearCart } = useContext(CartContext);
    const [preferenceId, setPreferenceId] = useState(null);

    const API_URL = window.location.hostname === "localhost"
        ? "http://localhost:8080"
        : "https://mc-ronald-s-1.onrender.com";

    // TIPO 1: Pago Estándar
    const handleStandardPay = () => {
        alert("¡Pedido confirmado! Por favor pasa a caja a pagar S/ " + total.toFixed(2));
        clearCart();
    };

    // TIPO 2: Pago con MercadoPago API
    const handleMercadoPago = async () => {
        try {
            const response = await fetch(`${API_URL}/api/mercadopago/create-preference`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cartItems),
            });

            const data = await response.json();
            if (data.preference_id) {
                setPreferenceId(data.preference_id);
            } else {
                alert("Error generando pago: " + (data.error || "Desconocido"));
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor de pagos");
        }
    };

    return (
        <div className="cart-container" style={{ padding: "20px", color: "white", textAlign: "center" }}>
            <h2>Tu Pedido Actual</h2>

            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío 🍔</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item.idItem} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0", background: "rgba(255,255,255,0.1)", padding: "10px", borderRadius: "8px" }}>
                                <span>{item.name} (x{item.quantity})</span>
                                <span>S/ {(item.price * item.quantity).toFixed(2)}</span>
                                <button onClick={() => removeFromCart(item.idItem)} style={{ background: "red", border: "none", color: "white", borderRadius: "50%", width: "25px", height: "25px", cursor: "pointer" }}>X</button>
                            </div>
                        ))}
                    </div>

                    <h3>Total a Pagar: S/ {total.toFixed(2)}</h3>

                    <div className="payment-methods" style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>

                        {/* Botón Tipo 1: Estándar */}
                        <button onClick={handleStandardPay} style={{ padding: "12px 24px", background: "#28a745", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", width: "100%", maxWidth: "300px" }}>
                            Pagar en Caja (Efectivo/Tarjeta)
                        </button>

                        {/* Botón Tipo 2: MercadoPago */}
                        {!preferenceId ? (
                            <button onClick={handleMercadoPago} style={{ padding: "12px 24px", background: "#009ee3", color: "white", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", width: "100%", maxWidth: "300px" }}>
                                Pagar Online con MercadoPago
                            </button>
                        ) : (
                            <div style={{ width: "100%", maxWidth: "300px" }}>
                                <Wallet initialization={{ preferenceId: preferenceId }} />
                            </div>
                        )}

                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;