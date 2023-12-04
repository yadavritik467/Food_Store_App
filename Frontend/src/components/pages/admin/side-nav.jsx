import React, { Fragment } from "react";
import { AiFillHome, AiOutlineDashboard } from "react-icons/ai";
// import { MdPayment } from "react-icons/md";
// import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import "./admin.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const SideNav = () => {
  const {  user } = useSelector(
    (state) => state.auth
  );

  return (
    <Fragment>
      {/* {load && <Loader />} */}
      {user.role === "admin" && (
        <div
         className="side-nav text-white"
         >
          <Link style={{color:"white"}} to={"/"}> <AiFillHome/> <br /> Go Home</Link>
          <span style={{color:"white"}} href="#dashboard">
            <AiOutlineDashboard /> <br />
            Dashboard
          </span>
        
          <a style={{color:"white"}} href="#food_creator">
            <MdOutlineProductionQuantityLimits /> <br />
            products
          </a>
          <a style={{color:"white"}} href="#user">
            <FaUserFriends /> <br />
            Users
          </a>
          <Link style={{color:"white"}} to={"/myProfile"}>
          <CgProfile /> <br />
            MyProfile
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default SideNav;
