import React, { useContext, useEffect, useState } from "react";
// import "../Combos/Combos.css";
import { CartContext } from "../../context/CartContext";
import { api } from "../../services/api";

const Hamburguesas = () => {
    const { addToCart } = useContext(CartContext);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const categories = await api.getCategories();
                const category = categories.find(c => c.name.toLowerCase() === "hamburguesas");

                if (category) {
                    const items = await api.getProductsByCategoryId(category.idCategory);
                    setProductos(items);
                }
            } catch (err) {
                console.error("Error cargando hamburguesas:", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-brand-red"></div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center text-brand-dark mb-12 uppercase tracking-wide relative inline-block w-full">
                    <span className="relative z-10">Hamburguesas</span>
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-brand-yellow rounded"></span>
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productos.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 text-xl">No hay hamburguesas disponibles.</p>
                    ) : (
                        productos.map(p => (
                            <div key={p.idItem} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                                    <img
                                        className="w-full h-56 object-contain p-6 bg-gray-50 transition-transform duration-300 group-hover:scale-105"
                                        src={p.imageUrl || "https://api-middleware-mcd.mcdonaldscupones.com/media/image/product$kpXxAHcZ/200/200/original?country=pe"}
                                        alt={p.name}
                                    />
                                    {p.previousPrice && (
                                        <span className="absolute top-4 right-4 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                                            Oferta
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight min-h-[3.5rem]">
                                        {p.name}
                                    </h3>
                                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
                                        {p.description}
                                    </p>

                                    <div className="mt-auto">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-2xl font-extrabold text-brand-dark">
                                                    S/ {p.price?.toFixed(2)}
                                                </span>
                                                {p.previousPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        S/ {p.previousPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => addToCart(p)}
                                            className="w-full bg-brand-yellow text-brand-dark font-extrabold py-3 px-4 rounded-xl shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <span className="text-xl">+</span> Agregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hamburguesas;