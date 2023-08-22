import React, { useEffect, useState } from "react";
import SideNav from "./side-nav";
import AllUsers from "./allUsers";
import FoodProducts from "./food-products";
// import AdminChart from "./chart";
import Payments from "./payments";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Side_nav_phone from "./side-nav-phone";
import Loader from "../components/UI/Loader";
// import io from 'socket.io-client';
// import  Socket  from "socket.io";


// const socket = io('http://localhost:4500')

const Dashboard = () => {
  const [load,setLoad] = useState(true)
  const [order, setOrder] = useState([]);
  const [onlineOrder, setOnlineOrder] = useState([]);
  const [myOrder, setMyOrder] = useState([]);
  const [customers, setCustomers] = useState([]);
   
    let orderFilter = order.filter((o)=>{
    return  o.OrderStatus !== "successfully cancel" && o.OrderStatus !== "delievered"
    })
    let online = order.filter((o)=>{
    return  o.PaymentMethod === "Online" && o.OrderStatus !== "successfully cancel" && o.OrderStatus !== "delievered"
    })
    let offline = order.filter((o)=>{
    return  o.PaymentMethod === "COD" && o.OrderStatus !== "successfully cancel" && o.OrderStatus !== "delievered"
    })
    let cancel = order.filter((o)=>{
    return  o.OrderStatus === "cancel"
    })
    let totalCancel = order.filter((o)=>{
    return  o.OrderStatus !== "successfully cancel"
    })
    let delievered = order.filter((o)=>{
    return  o.OrderStatus === "delievered"
    })
    
  // console.log(onlineOrder.length)

  // -------------------------------------------------------------------------------------- total orders
  const getMyOrder = async () => {
    setLoad(true)
    const { data } = await axios.get(
      "/order/admin/orders"
    );
    setLoad(false)

    if (data) {
      // window.alert("new order is created ")
      setOrder(data.order);
      setMyOrder(data.totalRevenu);
      // console.log(data.order)
    }
    // console.log(data.order)
  };

  useEffect(() => {
    getMyOrder();
  }, []);

  // -------------------------------------------------------------------------- all users

  const getAllCustomers = async () => {
    try {
      setLoad(true)
      const { data } = await axios.get(
        "/auth/getUser"
      );
      // console.log(data)
       setLoad(false)
      if (data) {
        setCustomers(data.user);
        // console.log(data.user)
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
      setLoad(false)
    }
  };
  useEffect(() => {
    getAllCustomers();
  }, []);

  return (
  
   
    <div
    className="admin-dashboard"
    >
      <SideNav />
      <Side_nav_phone />
      {load && <Loader/>  } 
       <div
        style={{ height: "86vh", overflow: "scroll", scrollBehavior: "smooth" }}
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
            <br /> Total Revenu : <br /> <span>{myOrder / 100}/-</span>{" "}
          </p>
          <p>
            {" "}
            <br /> Total User : <br /> <span>{customers.length}</span>{" "}
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
