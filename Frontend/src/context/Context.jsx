import { createContext, useState, useEffect, useContext } from "react";
import React, { useReducer } from "react";

import Loader from "../components/UI/Loader";

import { cartReducer } from "./Reducer";
import { searchReducer } from "./Reducer";
import axios from "axios";

const Cart = createContext();

const Context = ({ children }) => {
  const [load, setLoad] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, {
    Food: [],
    // Cart:  [],
    Cart: localStorage.getItem("addToCart")
      ? JSON.parse(localStorage.getItem("addToCart"))
      : [],
  });

  const [searchState, searchDispatch] = useReducer(searchReducer, {
    searchQuery: "",
  });

   const fetch_food = async () => {
     // this is right code uncomment after success
 
     setLoad(true);

      //  let data2 = await axios.get("https://food-backend-zeta.vercel.app/items/foods");
       let data2 = await axios.get("/items/foods");
       const  data   = data2.data.food;
      //  console.log(data2);

      
      setLoad(false);

    dispatch({
      type: "ADD_FOOD",
      payload: data,
    });
  };

  useEffect(() => {
    fetch_food();
  }, []);

  // to save data in local storage

  useEffect(() => {
    localStorage.setItem("addToCart", JSON.stringify(state.Cart));
  }, [state.Cart]);
  return (
    
      <Cart.Provider value={{ state, dispatch, searchState, searchDispatch }}>
        {load && <Loader />}
        {children}
      </Cart.Provider>
    
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
