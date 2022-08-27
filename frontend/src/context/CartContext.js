import { createContext, useContext, useState } from "react";

export const useCartContext = () => useContext(CartContext);

const CartContext = createContext();

function CartContextProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const setItems = (id) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id) == undefined) {
        return [...prev, { id, quantity: 1 }];
      }
      return (prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }))
      
    });
  };

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  };

  const decreaseItem = (id) => {
    setCartItems((prev) => {
      if (prev.find((item) => item.id === id)?.quantity === 1) {
        return (prev.filter((item) => item.id !== id))
      }

      return (
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }))
      
    });
  };

  return (
    <CartContext.Provider
      value={{ setItems, getItemQuantity, decreaseItem, cartItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
