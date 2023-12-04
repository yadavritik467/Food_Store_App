import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrder,
  myOrder,
  updateOrder,
} from "../../../redux/action/orderAction";

const MayOrder = () => {
  const { user } = useSelector((state) => state.auth);
  const { order } = useSelector((state) => state.order);
  const [showModal, setShowModal] = useState(false);
  const options = ["cancel"];
  const [category, setCategory] = useState(options[0]);
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allOrder());
  }, [dispatch]);

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);

  const updateHandler = async () => {
    await dispatch(updateOrder(id, category));
    await dispatch(myOrder());
    toast.success("cancle request has been sent");
    setShowModal(false);
  };
  const openModal = (_id) => {
    setShowModal(true);
    setId(_id);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ height: "100vh", overflowY: "scroll" }}>
      {" "}
      <br />
      <h1 style={{ textAlign: "center" }}>My Order</h1>
      {order?.length > 0 ? (
        <>
          {order?.map((m) => {
            return (
              <div key={m._id}>
                {user !== null && user._id === m.userID ? (
                  <div>
                    {m.OrderStatus === "successfully cancel" ||
                    m.OrderStatus === "delievered" ? (
                      <div>
                        <h3>{m.previousOrderStatus} -</h3>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() =>
                            toast.error(
                              "delete your order after getting your item "
                            )
                          }
                          style={{ float: "right", margin: "0px 10px 10px 0" }}
                        >
                          delete
                        </button>
                        <button
                          onClick={() => openModal(m._id)}
                          style={{
                            width: "fit-content",
                            float: "right",
                            margin: "0px 10px 10px 0",
                          }}
                        >
                          Request for cancellation
                        </button>
                        {showModal && (
                          <div className="modal">
                            {/* <Reveal> */}
                            <div className="modal-content">
                              <h3>Edit Order Details </h3>
                              <div className="modal-content-form">
                                <select
                                  name="category"
                                  id="category"
                                  onChange={(e) => setCategory(e.target.value)}
                                  defaultValue={category}
                                >
                                  {options.map((option, idx) => (
                                    <option key={idx}>{option}</option>
                                  ))}
                                </select>

                                {/* other input fields for item properties */}
                                <div className="modal-buttons">
                                  <button onClick={() => updateHandler()}>
                                    Send request
                                  </button>
                                  <button onClick={() => closeModal()}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <br /> <br /> <br /> <br />
                    {m.user.map((u) => {
                      return (
                        <div key={u._id}>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Order ID : <b>{m._id}</b>{" "}
                          </p>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Customer ID : <b>{m.userID}</b>{" "}
                          </p>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Name : <b>{u.name}</b>{" "}
                          </p>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Email : <b>{u.email}</b>{" "}
                          </p>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Phone No. : <b>{u.number}</b>{" "}
                          </p>
                          <p style={{ padding: "0 0 0 20px" }}>
                            {" "}
                            Address : <b>{u.address}</b>{" "}
                          </p>
                        </div>
                      );
                    })}
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Total Price: <b>Rs.{m.totalPrice / 100}/-</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Delivery charge: <b>Rs.{m.deliveryCahrge}/-</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Total Amount : <b>Rs.{m.total / 100}/-</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Order Status: <b>{m.OrderStatus}</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Paid At: <b>{m.paidAt}</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Payment Method: <b>{m.PaymentMethod}</b>{" "}
                    </p>
                    <p style={{ padding: "0 0 0 20px" }}>
                      {" "}
                      Payment Status: <b>{m.paymentInfo}</b>{" "}
                    </p>
                    {m.FoodID.map((mf) => {
                      return (
                        <div
                          key={mf._id}
                          style={{
                            borderBottom: "1px solid black",
                            display: "flex",
                            flexWrap: "wrap",
                            padding: "10px 0",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={mf.image}
                            style={{
                              height: "100px",
                              width: "100px",
                              borderRadius: "20px",
                            }}
                            alt=""
                          />
                          <br />
                          <p> title : {mf.title}</p>
                          <p>quantity : {mf.qty}</p>
                          <p>price : {mf.price}</p>
                        </div>
                      );
                    })}{" "}
                    <br />
                  </div>
                ) : null}
              </div>
            );
          })}
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}> Empty order list !!</h3>
      )}
    </div>
  );
};

export default MayOrder;
