import React, { useEffect } from "react";
import SideNav from "./side-nav";
import AllUsers from "./allUsers";
import FoodProducts from "./food-products";
// import AdminChart from "./chart";
import { Link } from "react-router-dom";
import SideNavPhone from "./side-nav-phone";
import { useDispatch, useSelector } from "react-redux";
import { allOrder } from "../../../redux/action/orderAction";
// import io from 'socket.io-client';
// import  Socket  from "socket.io";


// const socket = io('http://localhost:4500')

const Dashboard = () => {
  const {users } =useSelector(state => state.auth)
  const { totalRevenu,orders,loaded } = useSelector((state) => state.order);

  const dispatch = useDispatch()
   
    let orderFilter = orders.filter((o)=>{
    return  o.OrderStatus !== "successfully cancel"
    })
    let online = orders.filter((o)=>{
    return  o.PaymentMethod === "Online" && o.OrderStatus !== "successfully cancel" && o.OrderStatus !== "delievered"
    })
    let offline = orders.filter((o)=>{
    return  o.PaymentMethod === "COD" && o.OrderStatus !== "successfully cancel" && o.OrderStatus !== "delievered"
    })
    let cancel = orders.filter((o)=>{
    return  o.OrderStatus === "cancel"
    })
    let totalCancel = orders.filter((o)=>{
    return  o.OrderStatus === "successfully cancel"
    })
    let delievered = orders.filter((o)=>{
    return  o.OrderStatus === "delievered"
    })

  useEffect(() => {
    if(loaded !== true){
      dispatch(allOrder())
    }
  }, [dispatch,loaded]);

  

  return (
  
   
    <div
    className="d-flex w-100 border"
    >
      <SideNav />
      <SideNavPhone />
      {/* {load && <Loader/>  }  */}
       <div
        style={{ height: "100vh", overflow: "scroll", scrollBehavior: "smooth" }}
      >
        <div
          id="dashboard"
          style={{
            height: "fit-content",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            padding: "1rem 0",
          }}
        >
          <p>
            {" "}
            <br /> Total Revenu : <br /> <span>{totalRevenu / 100}/-</span>{" "}
          </p>
          <p>
            {" "}
            <br /> Total User : <br /> <span>{users?.length}</span>{" "}
          </p>
          <p>
            {" "}
            <br /> Total Order : <br /> <span>{orderFilter.length}</span> <br />
          {/* --------------------------------------------------------------------------------- link is yet to be provided route */}
             <Link
              style={{ borderBottom: "1px solid white", color: "blue" }}
              to={"/admin-dashboard/order"}
            >
              {" "}
              check total order
            </Link>{" "}
          </p>
          <p>
            {" "}
            <br /> Total Order by online : <br /> <span>{online.length} </span> <br />{" "}
            <Link to={"/admin-dashboard/onlineOrder"} style={{ borderBottom: "1px solid white", color: "blue" }}>
              check total online order 
            </Link>{" "}
          </p>
          <p>
            {" "}
            <br /> Total Order by COD : <br /> <span>{offline.length}</span> <br />{" "}
            <Link to={"/admin-dashboard/offlineOrder"} style={{ borderBottom: "1px solid white", color: "blue" }}>
              check total COD order
            </Link>{" "}
          </p>
          <p>
            {" "}
            <br /> Order Delievered : <br /> <span>{delievered.length}</span> <br />{" "}
            <Link to={"/admin-dashboard/delieverOrder"} style={{ borderBottom: "1px solid white", color: "blue" }}>
              check order Delievery
            </Link>{" "}
          </p>
          <p>
            {" "}
            <br /> Order Cancellation Request : <br /> <span>{cancel.length}</span> <br />{" "}
            <Link to={"/admin-dashboard/cancelOrder"} style={{ borderBottom: "1px solid white", color: "blue" }}>
              check order cancellation
            </Link>
          </p>
          <p>
            {" "}
            <br /> Total cancel order  : <br /> <span>{totalCancel.length}</span> <br />{" "}
            <Link style={{ borderBottom: "1px solid white", color: "blue" }}>
              check order cancellation
            </Link>
          </p>
        </div>
        {/* <Payments /> */}
        {/* <AdminChart /> */}
        <FoodProducts />
        <AllUsers />
        {/* <p>yet to be worked on</p> */}
      </div>
     
    </div>
   
  );
};

export default Dashboard;
