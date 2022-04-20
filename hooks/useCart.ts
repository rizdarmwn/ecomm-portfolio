import { createContext, useContext, useEffect, useState } from "react";
import { initiateCheckout } from "../lib/payments";
import products from "../products.json";

const defaultCart = {
  products: {},
};

export const CartContext = createContext({});

export function useCartState() {
  const [cart, setCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem("cart");
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if (data) {
      setCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem("cart", data);
  }, [cart]);

  const cartItems = Object.keys(cart.products).map((key) => {
    const product = products.find(({ id }) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product?.price,
    };
  });

  const subTotal = cartItems.reduce((acc, { pricePerItem, quantity }) => {
    return acc + pricePerItem * quantity;
  }, 0);
  const totalItems = cartItems.reduce((acc, { quantity }) => {
    return acc + quantity;
  }, 0);

  function addToCart({ id }: { id: string }) {
    setCart((prev) => {
      let cartState = { ...prev };

      if (cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;
      } else {
        cartState.products[id] = {
          id,
          quantity: 1,
        };
      }
      return cartState;
    });
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map((item) => {
        return {
          quantity: item.quantity,
          price: item.id,
        };
      }),
    });
  }

  function resetCart() {
    setCart(defaultCart);
  }

  return {
    cart,
    setCart,
    cartItems,
    subTotal,
    totalItems,
    addToCart,
    checkout,
    resetCart,
  };
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}
