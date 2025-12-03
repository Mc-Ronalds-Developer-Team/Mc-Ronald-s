import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Hamburguesas.css";

const Hamburguesas = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useContext(CartContext);

    const API_URL = window.location.hostname === "localhost"
        ? "http://localhost:8080"
        : "https://mc-ronald-s-1.onrender.com";

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/menu-items`);
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            } else {
                console.error("Error al obtener productos");
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="main-content" style={{ padding: "20px", color: "white" }}>
            <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Nuestro Menú</h2>
            
            {products.length === 0 ? (
                <p style={{ textAlign: "center" }}>Cargando productos o no hay disponibles...</p>
            ) : (
                <div className="products-grid" style={{ 
                    display: "grid", 
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", 
                    gap: "20px" 
                }}>
                    {products.map((product) => (
                        <div key={product.idItem} className="product-card" style={{ 
                            background: "rgba(255, 255, 255, 0.1)", 
                            borderRadius: "15px", 
                            padding: "20px", 
                            textAlign: "center",
                            border: "1px solid rgba(255,255,255,0.2)"
                        }}>
                            <img 
                                src={product.imageUrl || "https://via.placeholder.com/150"} 
                                alt={product.name} 
                                style={{ 
                                    width: "100%", 
                                    height: "180px", 
                                    objectFit: "cover", 
                                    borderRadius: "10px",
                                    marginBottom: "15px"
                                }} 
                            />
                            <h3 style={{ margin: "10px 0" }}>{product.name}</h3>
                            <p style={{ fontSize: "0.9em", opacity: 0.8 }}>{product.description}</p>
                            <p style={{ fontSize: "1.4em", fontWeight: "bold", color: "#ffc72c", margin: "15px 0" }}>
                                S/ {product.price.toFixed(2)}
                            </p>
                            
                            <button 
                                onClick={() => addToCart(product)} 
                                style={{ 
                                    background: "#e31837", 
                                    color: "white", 
                                    border: "none", 
                                    padding: "10px 20px", 
                                    borderRadius: "25px", 
                                    cursor: "pointer", 
                                    fontWeight: "bold",
                                    width: "100%",
                                    transition: "transform 0.2s"
                                }}
                                onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
                                onMouseOut={(e) => e.target.style.transform = "scale(1)"}
                            >
                                Agregar al Carrito 🛒
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hamburguesas;