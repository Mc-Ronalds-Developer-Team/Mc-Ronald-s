import React, { useState, useEffect } from "react";
import "./Productos.css";

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ 
    name: "", 
    description: "", 
    price: "", 
    imageUrl: "", 
    categoryId: "" 
  });

  const API_URL = window.location.hostname === "localhost" 
    ? "http://localhost:8080" 
    : "https://mc-ronald-s-1.onrender.com";

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
        const res = await fetch(`${API_URL}/api/menu-items`);
        if(res.ok) setProducts(await res.json());
    } catch(e) { console.error(e); }
  };

  const fetchCategories = async () => {
    try {
        const res = await fetch(`${API_URL}/api/menu-categories`);
        if(res.ok) {
            const data = await res.json();
            setCategories(data);
            if(data.length > 0) setForm(f => ({...f, categoryId: data[0].idCategory}));
        }
    } catch(e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!form.categoryId) return alert("Selecciona una categoría");

    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      imageUrl: form.imageUrl,
      category: { idCategory: parseInt(form.categoryId) }
    };

    const res = await fetch(`${API_URL}/api/menu-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert("Producto creado!");
      setForm({ ...form, name: "", description: "", price: "", imageUrl: "" });
      fetchProducts();
    } else {
      const err = await res.json();
      alert("Error: " + (err.error || "Falló al crear"));
    }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("¿Eliminar?")) return;
    await fetch(`${API_URL}/api/menu-items/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Gestión de Productos</h1>
      
      <form onSubmit={handleSubmit} className="product-form">
        <div style={{display:'grid', gap:'10px', gridTemplateColumns: '1fr 1fr'}}>
            <input placeholder="Nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <input placeholder="Descripción" value={form.description} onChange={e => setForm({...form, description: e.target.value})} required />
            <input type="number" placeholder="Precio" value={form.price} onChange={e => setForm({...form, price: e.target.value})} required />
            <input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})} />
            <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})}>
                {categories.map(c => <option key={c.idCategory} value={c.idCategory}>{c.name}</option>)}
            </select>
        </div>
        <button className="btn-crear" type="submit" style={{marginTop:'15px'}}>Guardar Producto</button>
      </form>

      <table className="tabla-productos">
        <thead>
          <tr>
            <th>Img</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.idItem}>
              <td><img src={p.imageUrl} alt="" style={{width:40, height:40, objectFit:'cover', borderRadius:'4px'}}/></td>
              <td>{p.name}</td>
              <td>S/ {p.price}</td>
              <td>
                <button className="btn-eliminar" onClick={() => handleDelete(p.idItem)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productos;