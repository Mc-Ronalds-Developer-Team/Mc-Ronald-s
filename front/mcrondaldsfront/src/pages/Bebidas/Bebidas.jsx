import React, { useContext, useEffect, useState } from "react";
import "../Combos/Combos.css";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";

const Bebidas = () => {
    const { addToCart } = useContext(CartContext);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const categories = await api.getCategories();
                const category = categories.find(c => c.name.toLowerCase() === "bebidas");

                if (category) {
                    const items = await api.getProductsByCategoryId(category.idCategory);
                    setProductos(items);
                }
            } catch (err) {
                console.error("Error cargando bebidas:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <div className="combos__container"><h2 style={{ color: "white", textAlign: "center" }}>Cargando Bebidas...</h2></div>;

    return (
        <div className="combos__container">
            <h1 className="combos__item combos__title">
                Bebidas
            </h1>
            <div className="combos__item grid__menu">
                {productos.length === 0 ? (
                    <p style={{ color: "white", textAlign: "center", width: "100%" }}>No hay bebidas disponibles.</p>
                ) : (
                    productos.map(p => (
                        <div className="grid__item" key={p.idItem}>
                            <div>
                                <a className="product-link" href="#">
                                    <img className="img-product" src={p.imageUrl || "https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"} alt={p.name} />
                                </a>
                            </div>
                            <div className="product-details">
                                <strong className="product-name">
                                    <a className="product-item-link" href="#">
                                        {p.name}
                                    </a>
                                </strong>
                                <a className="description-container">
                                    <div className="product-item-inner">
                                        <div className="product-item-description">
                                            <p>{p.description}</p>
                                        </div>
                                    </div>
                                </a>
                                <a className="price-box product-item">
                                    <div className="price-box">
                                        <span className="special-price">
                                            S/ {p.price?.toFixed(2)}
                                        </span>
                                        {p.previousPrice && (
                                            <span className="old-price">
                                                S/ {p.previousPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </a>
                                <div className="product-item-dinner">
                                    <div className="product-item-btn">
                                        <div className="actions-primary">
                                            <form className="tocart-form" onSubmit={(e) => { e.preventDefault(); addToCart(p); }}>
                                                <div className="fieldset">
                                                    <button className="btn-add-tocart" type="submit">
                                                        <span>Agregar</span>
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Bebidas;
