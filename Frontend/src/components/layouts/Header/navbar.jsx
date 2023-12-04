import React, { Fragment } from "react";
import { toast } from "react-hot-toast";
import { BsFillCartCheckFill } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { GrLocation } from "react-icons/gr";
import { MdDarkMode, MdDashboardCustomize } from "react-icons/md";
import { BsSun } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import img1 from "../../../assets/img/fish-market-2328964_1920.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../redux/action/authAction";

const Navbar = ({ dark, toggleDarkMode }) => {
  const { user } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { Cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();
  
  const shouldRenderNavbar = location.pathname.startsWith('/admin-dashboard');
  const myProfile = () => {
    navigate("/myProfile");
  };
  const logOut = async () => {
    try {
      await dispatch(logOutUser());
      toast.success("Logout Successfully");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
       className={shouldRenderNavbar ? 'd-none' : 'navbar sticky-top'}
      // className="navbar sticky-top"
      expand="lg"
      style={{ maxHeight: "280px", maxWidth: "100%" }}
    >
      <div className="nav1">
        <Link className="brand-logo" to={"/"}>
          <img src={img1}  alt="Fish Market" />
        </Link>
        <Link className=" btn-link">
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
            onClick={toggleDarkMode}
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
            dispatch({
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

        {user ? (
          <Fragment>
            {user.role !== "admin" ? (
              <>
                <AiOutlineUserAdd
                  onClick={myProfile}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                <BiLogOut
                  onClick={logOut}
                  style={{
                    fontSize: "30px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
              </>
            ) : (
              <Fragment>
                <Link
                  style={{ textDecoration: "none" }}
                  to={"/admin-dashboard"}
                >
                  {" "}
                  <MdDashboardCustomize
                    style={{
                      fontSize: "30px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  />
                </Link>
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
