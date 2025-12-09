import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
// import "./Carrito.css";

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
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-extrabold text-brand-dark mb-8 text-center uppercase tracking-wide border-b-4 border-brand-yellow inline-block pb-2">
                    Tu Pedido
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
                        <div className="text-6xl mb-4">🍔</div>
                        <p className="text-2xl text-gray-400 font-bold mb-6">Tu bandeja está vacía.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-brand-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-105"
                        >
                            Ir a pedir
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.cartId} className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4 transition-transform hover:scale-[1.01]">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.name}
                                        className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2"
                                    />
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                                        <p className="text-brand-red font-extrabold text-xl">S/ {item.price?.toFixed(2)}</p>
                                    </div>
                                    <button
                                        className="text-gray-400 hover:text-red-600 p-2 transition-colors"
                                        onClick={() => removeFromCart(item.cartId)}
                                        title="Eliminar"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-brand-yellow/20">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Resumen</h2>
                                <div className="flex justify-between items-center mb-2 text-gray-600">
                                    <span>Subtotal</span>
                                    <span>S/ {getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center mb-6 text-gray-600">
                                    <span>Impuestos</span>
                                    <span>S/ 0.00</span>
                                </div>
                                <div className="flex justify-between items-center mb-8 text-3xl font-extrabold text-brand-dark">
                                    <span>Total</span>
                                    <span>S/ {getCartTotal().toFixed(2)}</span>
                                </div>
                                <button
                                    className={`w-full py-4 rounded-xl font-extrabold text-lg shadow-lg transition-all transform active:scale-95 ${loading
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-brand-yellow text-brand-dark hover:bg-yellow-400"
                                        }`}
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <svg className="animate-spin h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : (
                                        "Confirmar Pedido"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carrito;
