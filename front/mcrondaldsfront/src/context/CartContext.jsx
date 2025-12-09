import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on init (Optional but good for kiosk)
  // For now keeping it simple per request.

  const addToCart = (item) => {
    // Check if item exists to increase quantity? Or just add separate line?
    // Requirement is simple "add". Let's just add to list.
    // Ideally we add a temporary ID for frontend keying.
    const newItem = { ...item, cartId: Date.now() + Math.random() };
    setCartItems([...cartItems, newItem]);
  };

  const removeFromCart = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => setCartItems([]);

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};