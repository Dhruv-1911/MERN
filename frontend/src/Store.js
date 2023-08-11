import { createContext, useReducer } from 'react';

export const Store = createContext();
const initialState = {
  userInfo: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : null,
  cart: {
    paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    CartItems: localStorage.getItem('CartItem')
      ? JSON.parse(localStorage.getItem('CartItem'))
      : [],
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
      localStorage.setItem('CartItem', JSON.stringify(CartItems));
      return { ...state, cart: { ...state.cart, CartItems } };

    case 'CART_DELETE': {
      const CartItems = state.cart.CartItems.filter(
        (x) => x._id !== action.payload._id
      );
      localStorage.setItem('CartItem', JSON.stringify(CartItems));
      return { ...state, cart: { ...state.cart, CartItems } };
    }

    case 'CART_CLEAR':{
      return{...state , cart:{...state.cart , CartItems:[]}}
    }

    case 'USER_SIGNIN': {
      return { ...state, userInfo: action.payload };
    }

    case 'USER_SIGN_OUT': {
      return {
        ...state,
        cart: { shippingAddress: {}, CartItems: [] ,paymentMethod:''},
        userInfo: null,
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    }
    case 'PAYMENT_METHOD': {
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    }
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
