import React, { Fragment } from "react";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
// import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./admin.css";
import { useAuth } from "../context/auth";


const SideNav = () => {
  const [auth] = useAuth();

  return (
    <Fragment>
      {/* {load && <Loader />} */}
      {auth.user.role === "admin" && (
        <div className="side-nav">
          <a style={{color:"white"}} href="#dashboard">
            <AiOutlineDashboard /> <br />
            Dashboard
          </a>
        
          <a style={{color:"white"}} href="#food_creator">
            <MdOutlineProductionQuantityLimits /> <br />
            products
          </a>
          <a style={{color:"white"}} href="#user">
            <FaUserFriends /> <br />
            Users
          </a>
        </div>
      )}
    </Fragment>
  );
};

export default SideNav;
