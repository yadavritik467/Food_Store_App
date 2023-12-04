import React from "react";
import { AiOutlineDashboard } from "react-icons/ai";
// import { MdPayment } from "react-icons/md";
// import { BsBarChartFill } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "./admin.css";
import { useSelector } from "react-redux";

const SideNavPhone = () => {
  const {  user } = useSelector(
    (state) => state.auth
  );

  return (
    <div>
      {user.role === "admin" && (
        <div>
          <div className="side-nav-phone">
           
            <a style={{ color: "white" }} href="#dashboard">
              <AiOutlineDashboard /> <br />
              Dashboard
            </a>
            
            <a style={{ color: "white" }} href="#food_creator">
              <MdOutlineProductionQuantityLimits /> <br />
              products
            </a>
            <a style={{ color: "white" }} href="#user">
              <FaUserFriends /> <br />
              Users
            </a>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default SideNavPhone;
