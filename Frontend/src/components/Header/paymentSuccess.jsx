import React from 'react'
import order from "./img/order-succes.jpg";
import { Link } from 'react-router-dom';
const PaymentSuccess = () => {
  return (
    <div className="order">
            <div className="order_background">
              <div className="order-container">
                <img src={order} alt="" />

                <br />

                <h4>Order Successfully placed !!</h4>
                <Link to={"/user/myOrder"}>Check your order list</Link>
                <br />

                {/* <span>Go to home fororder</span> */}
              </div>
            </div>
          </div>
  )
}

export default PaymentSuccess
