import React, { useState, useEffect } from "react";
import "./Productos.css";
import Modal from "../../../components/Modal/Modal";
import { api } from "../../../services/api";

const TablaBebidas = () => {
    const [productos, setProductos] = useState([]);
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para Modales
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    // Estados del Formulario
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({ nombre: "", descripcion: "", precio: "", precioAnterior: "", imagen: "" });

    const CATEGORY_NAME = "Bebidas";

    // Cargar datos
    useEffect(() => {
        const loadData = async () => {
            try {
                const categories = await api.getCategories();
                const category = categories.find(c => c.name.toLowerCase() === CATEGORY_NAME.toLowerCase());

                if (category) {
                    setCategoryId(category.idCategory);
                    const items = await api.getProductsByCategoryId(category.idCategory);
                    setProductos(items);
                    setLoading(false);
                } else {
                    setError(`Categoría '${CATEGORY_NAME}' no encontrada.`);
                    setLoading(false);
                }
            } catch (err) {
                console.error(err);
                setError("Error conectando con el servidor.");
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // --- CREAR ---
    const handleOpenCreate = () => {
        setFormData({ nombre: "", descripcion: "", precio: "", precioAnterior: "", imagen: "" });
        setIsCreateOpen(true);
    };

    const handleCreateSubmit = async () => {
        if (!categoryId) return;
        try {
            const payload = {
                name: formData.nombre,
                description: formData.descripcion,
                price: parseFloat(formData.precio),
                previousPrice: formData.precioAnterior ? parseFloat(formData.precioAnterior) : null,
                imageUrl: formData.imagen,
                category: { idCategory: categoryId }
            };
            const newProduct = await api.createProduct(payload);
            setProductos([...productos, newProduct]);
            setIsCreateOpen(false);
        } catch (err) {
            alert("Error al crear: " + err.message);
        }
    };

    // --- EDITAR ---
    const handleOpenEdit = (producto) => {
        setCurrentProduct(producto);
        setFormData({
            nombre: producto.name,
            descripcion: producto.description,
            precio: producto.price,
            precioAnterior: producto.previousPrice || "",
            imagen: producto.imageUrl || ""
        });
        setIsEditOpen(true);
    };

    const handleEditSubmit = async () => {
        try {
            const payload = {
                idItem: currentProduct.idItem,
                name: formData.nombre,
                description: formData.descripcion,
                price: parseFloat(formData.precio),
                previousPrice: formData.precioAnterior ? parseFloat(formData.precioAnterior) : null,
                imageUrl: formData.imagen,
                category: { idCategory: categoryId }
            };
            const updated = await api.updateProduct(currentProduct.idItem, payload);

            setProductos(productos.map(p => (p.idItem === currentProduct.idItem ? updated : p)));
            setIsEditOpen(false);
        } catch (err) {
            alert("Error al actualizar: " + err.message);
        }
    };

    // --- ELIMINAR ---
    const handleOpenDelete = (producto) => {
        setCurrentProduct(producto);
        setIsDeleteOpen(true);
    };

    const handleDeleteSubmit = async () => {
        try {
            await api.deleteProduct(currentProduct.idItem);
            setProductos(productos.filter(p => p.idItem !== currentProduct.idItem));
            setIsDeleteOpen(false);
        } catch (err) {
            alert("Error al eliminar: " + err.message);
        }
    };

    // Manejador de Inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (loading) return <div className="admin-content"><p>Cargando datos...</p></div>;
    if (error) return <div className="admin-content"><p style={{ color: "red" }}>{error}</p></div>;

    return (
        <div className="admin-content">
            <h1 className="admin-title">Gestión de Bebidas</h1>

            <button className="btn-crear" onClick={handleOpenCreate}>+ Crear Bebida</button>

            <div className="table-container">
                <table className="tabla-productos">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio (S/.)</th>
                            <th>Precio Anterior</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.length === 0 ? (
                            <tr><td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>No hay bebidas registradas</td></tr>
                        ) : (
                            productos.map((p) => (
                                <tr key={p.idItem}>
                                    <td>{p.idItem}</td>
                                    <td>
                                        {p.imageUrl && <img src={p.imageUrl} alt={p.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }} />}
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.description}</td>
                                    <td>{p.price?.toFixed(2)}</td>
                                    <td>
                                        {p.previousPrice && <span style={{ textDecoration: "line-through", color: "gray" }}>{p.previousPrice.toFixed(2)}</span>}
                                    </td>
                                    <td>
                                        <button className="btn-editar" onClick={() => handleOpenEdit(p)}>Editar</button>
                                        <button className="btn-eliminar" onClick={() => handleOpenDelete(p)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* --- MODAL CREAR --- */}
            <Modal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                title="Crear Nueva Bebida"
                footer={
                    <>
                        <button className="btn-eliminar" onClick={() => setIsCreateOpen(false)}>Cancelar</button>
                        <button className="btn-crear" style={{ marginBottom: 0 }} onClick={handleCreateSubmit}>Guardar</button>
                    </>
                }
            >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows="3" />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Precio Anterior:</label>
                    <input type="number" name="precioAnterior" value={formData.precioAnterior} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>URL Imagen:</label>
                    <input type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} placeholder="https://..." />
                </div>
            </Modal>

            {/* --- MODAL EDITAR --- */}
            <Modal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                title="Editar Bebida"
                footer={
                    <>
                        <button className="btn-eliminar" onClick={() => setIsEditOpen(false)}>Cancelar</button>
                        <button className="btn-crear" style={{ marginBottom: 0 }} onClick={handleEditSubmit}>Actualizar</button>
                    </>
                }
            >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange} rows="3" />
                </div>
                <div className="form-group">
                    <label>Precio:</label>
                    <input type="number" name="precio" value={formData.precio} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Precio Anterior:</label>
                    <input type="number" name="precioAnterior" value={formData.precioAnterior} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>URL Imagen:</label>
                    <input type="text" name="imagen" value={formData.imagen} onChange={handleInputChange} />
                </div>
            </Modal>

            {/* --- MODAL ELIMINAR --- */}
            <Modal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                title="Eliminar Bebida"
                footer={
                    <>
                        <button className="btn-editar" onClick={() => setIsDeleteOpen(false)}>Cancelar</button>
                        <button className="btn-eliminar" onClick={handleDeleteSubmit}>Eliminar</button>
                    </>
                }
            >
                <p>¿Estás seguro que deseas eliminar <strong>{currentProduct?.name}</strong>?</p>
                <p style={{ color: "gray", fontSize: "0.9rem" }}>Esta acción no se puede deshacer.</p>
            </Modal>

        </div>
    );
};

export default TablaBebidas;
