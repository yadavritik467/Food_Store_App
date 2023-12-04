const initialState = {
    searchQuery:''
  };

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FILTER_BY_SEARCH":
        return { ...state, searchQuery: action.payload };
   
  
      default:
        return {...state};
     
    }
  }