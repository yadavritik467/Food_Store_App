import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allOrder, deleteOrder, updateOrder } from "../../../../redux/action/orderAction";

const TotalOrder = () => {
  const [showModal, setShowModal] = useState(false);
  const options = ["processing", "delievered",];
  const [category, setCategory] = useState(options[0]);
  const[id,setId] = useState("")
 
  const { searchQuery } = useSelector((state) => state.search);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

useEffect(()=>{
  dispatch(allOrder());
},[dispatch])

  const Order = () => {
    let totalOrder = orders;
    if (searchQuery) {
      totalOrder = totalOrder?.filter((data) => {
        return data._id.toLowerCase().includes(searchQuery);
      });
    }
    return totalOrder;
  };

  const deleteOrderHandler = async (_id) => {
    await dispatch(deleteOrder(_id));
    await dispatch(allOrder());
    toast.success("Order deleted successfully");
  };

  const updateHandler = async () => {
    try {
      // setLoad(true);
      await dispatch(updateOrder(id, category));
      await dispatch(allOrder());
      setShowModal(false);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in updating food");
    }
  };

const openModal = (_id) => {
  setShowModal(true);
  setId(_id)
  // console.log(_id);
};

const closeModal = () => {
  setShowModal(false);
};


  return (

 <div style={{ height: "74vh", overflowY: "scroll",userSelect:"text" }}>
      {" "}
      <br />
      <h1 style={{ textAlign: "center" }}>Admin : Total Order</h1> <br /> <br />
      <Link
        style={{
          borderBottom: "1px solid white",
          color: "blue",
          padding: "0 1rem",
        }}
        to={"/admin-dashboard"}
      >
        {" "}
        GO BACK{" "}
      </Link>{" "}
      <br />
      <input
        onChange={(e) => {
          dispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          });
        }}
        style={{ textAlign:"center" ,width:"100%" }}
        type="text"
        placeholder="search order ID"
      />{" "}
      <br /> <br /> <br />
      {/* {myOrder.length > 0 ? ( */}
        <div>
          {Order().map((m) => {
            return (
              <div key={m._id}>
                 <br />
                 <button
                  onClick={() => deleteOrderHandler(m._id)}
                  style={{ float: "right", margin: "0px 10px 10px 0" }}
                >
                  delete
                </button>
                <button
                  onClick={() => openModal(m._id)}
                  style={{ width:"fit-content" ,float: "right", margin: "0px 10px 10px 0" }}
                >
                  Update Order Details
                </button>
                {showModal && (
                            <div className="modal">
                         
                                <div className="modal-content">
                                  <h3>Edit Order Details {m._id} </h3>
                                  <div className="modal-content-form" >
                                    <select
                                      name="category"
                                      id="category"
                                      onChange={(e) =>
                                        setCategory(e.target.value)
                                      }
                                      defaultValue={category}
                                    >
                                      {options.map((option, idx) => (
                                        <option key={idx}>{option}</option>
                                      ))}
                                    </select>

                                    {/* other input fields for item properties */}
                                    <div className="modal-buttons">
                                      <button onClick={() => updateHandler()}>Update</button>
                                      <button onClick={() => closeModal()}>
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          )}
                 <br /> <br /> <br />
                {m.user.map((u) => {
                  return (
                    <div key={u._id}>
                      <p style={{ padding: "0 0 0 20px" }}>
                        {" "}
                        Order ID : <b>{m._id}</b>{" "}
                      </p>
                      <p style={{ padding: "0 0 0 20px" }}>
                        {" "}
                        Customer ID : <b>{u._id}</b>{" "}
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
                        Phone No. : <b>{u.phone}</b>{" "}
                      </p>
                      <p style={{ padding: "0 0 0 20px" }}>
                        {" "}
                        Address : <b>{u.address}</b>{" "}
                      </p>
                    </div>
                  );
                })}
               <p style={{padding:"0 0 0 20px"}}> Total Price: <b>Rs.{m.totalPrice/100}/-</b> </p>
            <p style={{padding:"0 0 0 20px"}}> Delivery charge: <b>Rs.{m.deliveryCahrge}/-</b> </p>
            <p style={{padding:"0 0 0 20px"}}> Total Amount : <b>Rs.{m.total/100}/-</b> </p>
                <p style={{ padding: "0 0 0 20px" }}>
                  {" "}
                  Order Status: <b>{m.OrderStatus}</b> 
                            
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
                      <p> title : {mf.title}</p>
                      <p>quantity : {mf.qty}</p>
                      <p>price : {mf.price}</p>
                    </div>
                  );
                })}
               
                <br />
              </div>
            );
          })}
        </div>
     
    </div>
    

  );
};

export default TotalOrder;