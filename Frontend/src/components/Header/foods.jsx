import React from "react";

import { BsFillCartCheckFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

import { CartState } from "../../context/Context";

import "./Common.css";
import toast from "react-hot-toast";
// import { Reveal } from 'react-reveal';
//import { Reveal } from 'react-reveal';

const Foods = ({ data, state, dark ,setDark }) => {
  const {
    state:  {Cart} ,
    dispatch,
  } = CartState();
  // console.log(Cart);

  
  return (
  
      <div className={`item-card ${!dark ? "item-card":"item-card_1"}`}>
        <div className="text-center">

      
           <img className="img-fluid" src={data.image.url} alt={data.title} />
    
         
 
        </div>

        <div className="item-card-info">
          <div className="title">
            <h3>{data.title}</h3>
          </div>
          <div className="pricing">
            <span>₹{data.price}</span>
          </div>
        </div>

        {Cart.some((p) => p._id === data._id) ? (
          
           
            <div className="btn-cart">
              <button
                style={{ fontSize: "18.1px" }}
                className="cart-add"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_CART",
                    payload: {
                      _id: data._id,
                    },
                    
                  })
                  & toast.success("Remove from cart")
                }
              >
                Remove item <RiDeleteBin5Line />{" "}
              </button>
            </div>
          
        ) : (
          
           
            <div className="btn-cart">
              <button
                className="cart-add"
                onClick={() =>
                  dispatch({
                    type: "ADD_CART",
                    payload: {
                      _id: data._id,
                      image: data.image.url,
                      title: data.title,
                      price: data.price,
                      qty:1
                    },
                  })
                  & toast.success("Added to cart")
                }
              >
                Add to Cart <BsFillCartCheckFill />
              </button>
            </div>
          
        )}
      </div>
  
  );
};

export default Foods;
