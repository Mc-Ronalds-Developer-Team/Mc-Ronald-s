import React, { useState, useEffect } from "react";
import "./Platos.css";
import Sidebar from "../Sidebar/Sidebar";

const Platos = () => {
  const [platos, setPlatos] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: "", precio: "", categoria: "" });
  const [editMode, setEditMode] = useState(false);

  // Nuevo estado para manejar el ID incremental
  const [nextId, setNextId] = useState(1);

  // Cargar platos desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("platos");
    if (data) {
      const parsed = JSON.parse(data);
      setPlatos(parsed);

      // Ajustar el contador al último ID + 1
      if (parsed.length > 0) {
        const maxId = Math.max(...parsed.map(p => p.id));
        setNextId(maxId + 1);
      }
    }
  }, []);

  // Guardar platos en localStorage
  useEffect(() => {
    localStorage.setItem("platos", JSON.stringify(platos));
  }, [platos]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setPlatos(platos.map(p => p.id === form.id ? form : p));
      setEditMode(false);
    } else {
      // 🔹 Usar nextId como ID incremental
      setPlatos([...platos, { ...form, id: nextId }]);
      setNextId(nextId + 1); // incrementar para el siguiente plato
    }
    setForm({ id: null, nombre: "", precio: "", categoria: "" });
  };

  const handleEdit = (plato) => {
    setForm(plato);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    setPlatos(platos.filter(p => p.id !== id));
  };

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <h1 className="admin-title">Gestión de Platos</h1>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="form-plato">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del plato"
            value={form.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={form.precio}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="categoria"
            placeholder="Categoría"
            value={form.categoria}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn-crear">
            {editMode ? "Actualizar Plato" : "+ Crear Plato"}
          </button>
        </form>

        {/* Tabla */}
        <table className="tabla-platos">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio (S/.)</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{parseFloat(p.precio).toFixed(2)}</td>
                <td>{p.categoria}</td>
                <td>
                  <button className="btn-editar" onClick={() => handleEdit(p)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Platos;
