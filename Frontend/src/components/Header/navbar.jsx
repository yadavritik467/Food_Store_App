import React, { Fragment } from "react";

import { toast } from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { MdDarkMode, MdDashboardCustomize } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import img1 from "./img/fish-market-2328964_1920.jpg";
import "../Header/NavbarCo.css";
import ReactGA from 'react-ga';
import { Link, useNavigate,  } from "react-router-dom";
import { CartState } from "../../context/Context";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Navbar = ({ dark, toggleDarkMode }) => {
  const [auth, setAuth] = useAuth();

  // console.log(auth)
  let {
    state: { Cart },
    searchDispatch,
  } = CartState();

  // console.log(Cart.length)

  
  // Function to toggle dark mode
  

const navigate = useNavigate()

  const logOut = async() => {
    // ReactGA.event({
    //   category: 'User Logout',
    //   action: 'Logout',
    //   label: 'Logout',
    // });
   
    try {
      
        await axios.get("/auth/logout")
        await setAuth({
           ...auth,
           user: null,
         });
         toast.success("Logout Successfully");
         navigate("/")
     
    } catch (error) {
      console.error(error.message);
    }

  };


  return (
    
      <div
        className="navbar sticky-top"
        expand="lg"
        style={{ maxHeight: "280px", maxWidth: "100%" }}
      >
        <div className="nav1">
          <Link to={"/"}>
            <img src={img1} className="brand-logo pt-2 " alt="Fish Market" />
          </Link>
          <Link  className=" btn-link">
            <GrLocation /> Raigarh's Store
          </Link>
          {!dark ? (
            <MdDarkMode
              style={{
                margin: "0 0",
                padding: "0 5",
                fontSize: "30px",
                cursor: "pointer",
              }}
              
              onClick={toggleDarkMode }
            />
          ) : (
            <BsSun
              style={{
                margin: "0 0",
                padding: "0 5",
                fontSize: "30px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={toggleDarkMode}
            />
          )}
        </div>

        <Link to={"/searchFood"} className="nav2">
          <input
            onChange={(e) => {
              searchDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
            type="text"
            placeholder="search your food . . . ."
            name="search"
          />
         
            <BsSearch />
          
        </Link>

        <div>
          <Link to={"/"} className="btn-link">
            Home
          </Link>

          {auth.user ? (
            <Fragment>
              {(auth.user.role !== "admin") ? (
                <BiLogOut
                  onClick={logOut}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              ) : (
                <Fragment>
                 <Link style={{textDecoration:"none"}} to={"/admin-dashboard"}> <MdDashboardCustomize
                    style={{
                      fontSize: "30px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  /></Link>
                  <BiLogOut
                  onClick={logOut}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                </Fragment>
              )}
            </Fragment>
          ) : (
            <Link to={"/login"} className="btn-link link-login  ">
              Login
            </Link>
          )}

          <Link to={"/cart"} className="btn-link ">
            <BsFillCartCheckFill />
            <span style={{ color: "gray" }}>{Cart.length}</span>
          </Link>
        </div>
      </div>
    
  );
};

export default Navbar;
