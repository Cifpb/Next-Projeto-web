import { createContext, useState, useEffect, useContext } from "react";

export const CartContext = createContext();
CartContext.displayName = "MyCart";

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* Hook personalizado */
  const addToCart = (newProduct) => {
    const isProductInCart = cart.some(item => item.id === newProduct.id);
    if (!isProductInCart) {
      setCart([...cart, { ...newProduct, quantidade: 1 }]);
    } else {
      setCart(cart.filter(item => item.id !== newProduct.id));
    }
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (productId, quantity) => {
    setCart(cart.map(item => item.id === productId
      ? { ...item, quantidade: quantity }
      : item));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}