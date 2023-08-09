import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  cart: {
    CartItems: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      const newItem = action.payload;
      const exists = state.cart.CartItems.find((x) => x._id === newItem._id);
      const CartItems = exists
        ? state.cart.CartItems.map((item) =>
            item._id === exists._id ? newItem : item
          )
        : [...state.cart.CartItems, newItem];
      return { ...state, cart: { ...state.cart, CartItems } };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
