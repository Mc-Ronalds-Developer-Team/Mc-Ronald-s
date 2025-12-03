import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cargar carrito guardado al iniciar
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Agregar producto (Si ya existe, suma cantidad)
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.idItem === product.idItem);
      if (existing) {
        return prev.map((item) =>
          item.idItem === product.idItem ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Quitar producto
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.idItem !== id));
  };

  // Limpiar todo
  const clearCart = () => setCartItems([]);

  // Calcular Total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};