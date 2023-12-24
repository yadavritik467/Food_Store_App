import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import PaymentLoader from "../../UI/paymentLoad";
import { useDispatch, useSelector } from "react-redux";
import { allOrder, createOrder, myOrder } from "../../../redux/action/orderAction";

function Cart() {
  const [load, setLoad] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cashLoad, setCashLoad] = useState(false);
  const [onlinePayment] = useState("Online");
  const [CODPayment] = useState("COD");
  const [CODPaymentStatus] = useState("unpaid");
  const [onlinePaymentStatus] = useState("paid");
  const [showModal, setShowModal] = useState(false);
  const [popUpModal, setPopUpModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const changeQty = (_id, qty) => {
    if(qty < 1){
      dispatch({
        type: "REMOVE_CART",
        payload: {
          _id:_id,
        },
      })
    } else {
      dispatch({
        type: "CHANGE_QTY",
        payload: {
          _id,
          qty,
        },
      });
    }
    
  };

  const closeModal = () => {
    setPopUpModal(false);
  };

  useEffect(() => {
    setAmount(
      Cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
    );
  }, [Cart]);

  // payment is working succesfully
  const initPayment = (data) => {
    let orderDetail = {};
    orderDetail.FoodID = Cart;
    orderDetail.PaymentMethod = onlinePayment;
    orderDetail.paymentInfo = onlinePaymentStatus;
    orderDetail.user = user;
    orderDetail.userID = user._id;

    const options = {
      key: "rzp_test_cfpXwdEBSA6tMg",
      amount: data.amount,
      currency: "INR",
      name: data.title,
      order_id: data._id,
      callback_url: "/payment/paymentVarification",
      handler: async function (response) {
        await dispatch(createOrder(orderDetail,amount));
        await dispatch(myOrder());
        await dispatch(allOrder());
        dispatch({
          type: "CLEAR_ALL",
        });
        navigate("/user/paymentSuccess");
      },

      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#FFC300",
      },
    };
    var rzp1 = new window.Razorpay(options);

    rzp1.open();
  };

  const orderHandler = async (amount) => {
    if (user === null) {
      toast.error("Please create your account");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (user.number === null && user.address === null) {
      toast.error("Please enter your address and number");
      setTimeout(() => {
        navigate("/myProfile");
      }, 1500);
    } else {
      setLoad(true);
      const { data } = await axios.post("/payment/payment", { amount: amount });

      setShowModal(false);
      // console.log(data);
      initPayment(data.data);
      setLoad(false);
      setCashLoad(false);
    }
  };

  const CashHandler = async (amount) => {
    if (user === null) {
      toast.error("Please create your account");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (user.number === null && user.address === null) {
      toast.error("Please enter your address and number");
      setTimeout(() => {
        navigate("/myProfile");
      }, 1500);
    } else {
      setCashLoad(true);
      let orderDetail = {};
      orderDetail.FoodID = Cart;
      orderDetail.PaymentMethod = CODPayment;
      orderDetail.paymentInfo = CODPaymentStatus;
      // orderDetail.totalPrice = amount;
      orderDetail.user = user;
      orderDetail.userID = user._id;
      // setCashLoad(true);
      await dispatch(createOrder(orderDetail,amount));
      await dispatch(myOrder());
      await dispatch(allOrder());
      setCashLoad(false);
      dispatch({
        type: "CLEAR_ALL",
      });

      navigate("/user/paymentSuccess");
    }
  };

  return (
    <div className="checkout-modal">
      <h2>Checkout Modal</h2> <br />
      <Link
        style={{
          marginLeft: "auto",
          marginRight: "2rem",
          textDecoration: "auto",
          fontSize: "20px",
        }}
        to={"/user/myOrder"}
      >
        My order
      </Link>
      <div className="cart_container">
        {Cart?.length > 0 ? (
          Cart?.map((data) => {
            return (
              <div key={data._id} className="checkout-modal_list">
                <div className="checkout-modal_list-item">
                  <div>
                    <img
                      className="img-cart"
                      alt={data.title}
                      src={data.image}
                    />
                  </div>

                  <div className="information">
                    <h4>
                      {data.title} <br /> Rs. {data.price}
                    </h4>
                  </div>

                  <div className=" cart-addon cart-addon__modal">
                    <button onClick={() => changeQty(data._id, data.qty - 1)}>
                      -
                    </button>
                    <span className="counter">{data.qty}</span>
                    <button onClick={() => changeQty(data._id, data.qty + 1)}>
                      +
                    </button>
                    <button
                      style={{ fontSize: "18.1px" }}
                      className="cart-add"
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_CART",
                          payload: {
                            _id: data._id,
                          },
                        }) & toast.success("Remove from cart")
                      }
                    >
                      <RiDeleteBin5Line />{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-cart">please add something in your cart</div>
        )}
      </div>
      <hr />
      {user ? (
        <div className="total_amount">
          <div>
            <h4>Total Items: {Cart.length} </h4>
            <h4>Total Amount: {amount}/- INR </h4>
            <small>
              Charges for per order: {amount} + 20 = <b>{amount + 20}/- INR</b>{" "}
            </small>
          </div>

          {
            <div>
              <button
                onClick={() =>
                  dispatch({
                    type: "CLEAR_ALL",
                  }) & toast.success("All cleared from cart")
                }
              >
                Clear all{" "}
              </button>

              <button onClick={() => setShowModal(true)}> Order Now</button>
              {showModal && (
                <div className="payment-modal">
                  {/* <Reveal> */}
                  <div className="payment-modal-content">
                    <h2>
                      Payment Method{" "}
                      <button
                        style={{
                          margin: "2px",
                          padding: "0px",
                          backgroundColor: "transparent",
                          color: "grey",
                          fontSize: "25px",
                        }}
                        onClick={() => setShowModal(false)}
                      >
                        X
                      </button>{" "}
                    </h2>
                    <button onClick={() => orderHandler(amount)}>
                      {" "}
                      {load ? <PaymentLoader /> : "online Bank/UPI"}{" "}
                    </button>
                    <p>Or</p>
                    <button onClick={() => CashHandler(amount)}>
                      {" "}
                      {cashLoad ? <PaymentLoader /> : "Cash on delievery"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      ) : (
        <div>
          <div>
            <h4>Total Items: {Cart.length} </h4>
            <h4>Total Amount: {amount}/- INR </h4>
            <small>
              Charges for per order: {amount} + 20 = <b>{amount + 20}/- INR</b>{" "}
            </small>
          </div>
          <div style={{ float: "right" }}>
            <button
              style={{ float: "right", margin: "20px 5px" }}
              onClick={() => setPopUpModal(true)}
            >
              {" "}
              Order Now
            </button>
            <button
              style={{ float: "right", margin: "20px 5px" }}
              onClick={() =>
                dispatch({
                  type: "CLEAR_ALL",
                }) & toast.success("All cleared from cart")
              }
            >
              Clear all{" "}
            </button>
          </div>
          {popUpModal && (
            <div className="modal">
              <div className="modal-content">
                <div className="modal-content-form">
                  <p
                    style={{
                      margin: "auto",
                      padding: "2rem",
                      fontSize: "1.5rem",
                    }}
                  >
                    please{" "}
                    <Link
                      to={"/login"}
                      style={{ borderBottom: "1px solid blue" }}
                    >
                      Login
                    </Link>{" "}
                    to order !!
                  </p>
                  <div className="modal-buttons">
                    <button onClick={() => closeModal()}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cart;
