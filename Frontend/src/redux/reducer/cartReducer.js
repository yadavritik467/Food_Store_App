const initialState = {
  Cart: JSON.parse(localStorage.getItem('cart')) || [],
};

const saveToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CART':
      const updatedCartAdd = [{ ...action.payload, qty: 1 }, ...state.Cart];
      saveToLocalStorage(updatedCartAdd);
      return {
        ...state,
        Cart: updatedCartAdd,
      };

    case 'REMOVE_CART':
      const updatedCartRemove = state.Cart.filter((item) => item._id !== action.payload._id);
      saveToLocalStorage(updatedCartRemove);
      return {
        ...state,
        Cart: updatedCartRemove,
      };

    case 'CHANGE_QTY':
      const updatedCartChangeQty = state.Cart.map((c) =>
        c._id === action.payload._id ? { ...c, qty: action.payload.qty } : c
      );
      saveToLocalStorage(updatedCartChangeQty);
      return {
        ...state,
        Cart: updatedCartChangeQty,
      };

    case 'CLEAR_ALL':
      saveToLocalStorage([]);
      return { ...state, Cart: [] }; 
    default:
      return state;
  }
};

