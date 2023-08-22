import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { CartState } from "../../context/Context";


const OnlineOrder = () => {

  // const [load,setLoad] = useState(false);
  const [myOrder, setMyOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const options = ["processing", "delievered"];
  const [category, setCategory] = useState(options[0]);
  const[id,setId] = useState("")

  //--------------------------------------------------------------------------------  search filter

  const {
    searchState: { searchQuery },
    searchDispatch
  } = CartState();


   const Order = () =>{
    let myorder = myOrder;
    if (searchQuery) {
      myorder = myorder.filter((data) => {
        return data._id.toLowerCase().includes(searchQuery);
      });
    }
    return myorder;
   }
 

  const getMyOrder = async () => {
    // setLoad(true)
    const { data } = await axios.get(
      "/order/admin/orders",
    );
  //  setLoad(false);
    if (data) {
      setMyOrder(data.order);
      // console.log(data.order)
    }
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  const deleteOrder = async (_id) => {
    await axios.delete(`/order/admin/orders/${_id}`);
    toast.success("Order deleted successfully");
    getMyOrder();
  };
 
  // -------------------------------------------------------------------------------------------  update order list


const updateHandler = async () => {
  try {
    // setLoad(true);

    const { data } = await axios.put(`/order/admin/update-orders/${id}`,{category},

      
    );
    // setLoad(false);

    if (data) {
      setShowModal(false);
      toast.success(data.message);
      // console.log(data);
      getMyOrder();
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong in updating food");
  }
  getMyOrder();
  // console.log(_id);
};

// console.log(updateHandler)

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
      <h1 style={{ textAlign: "center" }}>Admin : Total Online Order</h1> <br /> <br />
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
          searchDispatch({
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
                  {m.PaymentMethod === "Online" && ( <div>
                    <br />
                 <button
                  onClick={() => deleteOrder(m._id)}
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
                              {/* <Reveal> */}
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
                              {/* </Reveal> */}
                            </div>
                          )}
               
                 <br /> <br /> <br />
                {m.user.map((u) => {
                  return (
                    <div key={u._id}>
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
                      <p> title : {mf.title}</p>
                      <p>quantity : {mf.qty}</p>
                      <p>price : {mf.price}</p>
                    </div>
                  );
                })}
               
                <br />
                  </div>)}
                
              </div>
            );
          })}
        </div>
     
    </div>
    
 
  );
};

export default OnlineOrder;
