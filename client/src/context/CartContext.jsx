import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const localData = localStorage.getItem('ss_cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('ss_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item._id === product._id);
    
    setCartItems((prevItems) => {
      const isExisting = prevItems.find((item) => item._id === product._id);
      if (isExisting) {
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    if (existing) {
      toast.success(`Updated quantity for ${product.name}`, {
        icon: '✅',
        id: `cart-${product._id}` // Prevents duplicates if clicked rapidly
      });
    } else {
      toast.success(`${product.name} added to cart!`, {
        icon: '✅',
        id: `cart-${product._id}`
      });
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    toast.error('Item removed from cart', {
      icon: '🗑️',
      id: `remove-${id}`
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('ss_cart');
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
