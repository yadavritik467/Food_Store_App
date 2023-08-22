export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FOOD":
      return { ...state, Food: action.payload };
    case "ADD_CART":
      return { ...state, Cart: [{ ...action.payload, qty: 1 }, ...state.Cart] };
    case "REMOVE_CART":
      return {
        ...state,
        Cart: state.Cart.filter((e) => e._id !== action.payload._id),
      };
    case "CLEAR_ALL":
      return {
        ...state,
        Cart: [],
      };


    case "CHANGE_QTY":
      return {
        ...state,
        Cart: state.Cart.filter((c) => c._id === action.payload._id ? c.qty = action.payload.qty : c.qty)
      }
    default:
      return state;
  }
};


export const searchReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };
 

    default:
      return {...state};
   
  }
}




