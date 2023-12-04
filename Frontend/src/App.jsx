import React, { useEffect, useState, Suspense } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/layouts/Header/navbar";
import Cart from "./components/pages/foods/Cart";
import Footer from "./components/layouts/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./components/pages/auth/forgot_password";
import PaymentSuccess from "./components/pages/order/paymentSuccess";
import NotFound from "./components/Routes/notFound";
// import AllUsers from "./admin/allUsers";
// import AdminChart from "./admin/chart";
// import Payments from "./admin/payments";
import Dashboard from "./components/pages/admin/dashboard";
import MayOrder from "./components/pages/order/mayOrder";
import SearchAllFood from "./components/pages/foods/searchAllFood";
import TotalOrder from "./components/pages/admin/adminOrder/totalOrder";
import OnlineOrder from "./components/pages/admin/adminOrder/onlineOrder";
import OfflineOrder from "./components/pages/admin/adminOrder/offlineOrder";
import CancelOrder from "./components/pages/admin/adminOrder/cancelOrder";
import DelieverOrder from "./components/pages/admin/adminOrder/delieverOrder";
import ResetPassword from "./components/pages/auth/ResetPassword";
import { loadUser } from "./redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import { getAllFood } from "./redux/action/foodAction";
import Loader from "./components/UI/Loader";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./components/pages/auth/Login"));
const SignUp = React.lazy(() => import("./components/pages/auth/SignUp"));
const MyProfile = React.lazy(() => import("./components/pages/auth/MyProfile"));

function App({ state }) {
  const [dark, setDark] = useState(false);
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //------------------------------------------------------------------------  dakr mode here
  const toggleDarkMode = () => {
    const updatedDarkMode = !dark;
    setDark(updatedDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(updatedDarkMode));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      setDark(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    // for user
    dispatch(loadUser());
    // for food
    dispatch(getAllFood());
  }, [dispatch]);

  return (
    <>
      <Router>
        <div className={`App ${!dark ? "App" : "App_1"}`}>
          <Navbar
            dark={dark}
            setDark={setDark}
            toggleDarkMode={toggleDarkMode}
          />
          <Toaster />

          <Routes>
            {/* -----------------For client-----------------------   */}
            <Route
              path="/"
              element={
                <Suspense fallback={<Loader />}>
                  <Home state={state} dark={dark} />
                </Suspense>
              }
            />

            <Route path="/searchFood" element={<SearchAllFood dark={dark} />} />
            <Route
              path="/Login"
              element={
                <Suspense fallback={<Loader />}>
                  <Login dark={dark} />
                </Suspense>
              }
            />
            <Route
              path="/signUp"
              element={
                <Suspense fallback={<Loader />}>
                  <SignUp dark={dark} />
                </Suspense>
              }
            />
            <Route
              path="/myProfile"
              element={
                <Suspense fallback={<Loader />}>
                  <MyProfile dark={dark} />
                </Suspense>
              }
            />
            <Route
              path="/Login/forgot_password"
              element={<ForgotPassword dark={dark} />}
            />
            <Route path="/password/reset/:token" element={<ResetPassword />} />

            {/* -----------------For admin-----------------------   */}

            {user !== null && (
              <React.Fragment>
                {" "}
                {user.role === "admin" && (
                  <React.Fragment>
                    <Route
                      path="/admin-dashboard"
                      element={<Dashboard dark={dark} />}
                    />
                    <Route
                      path="/admin-dashboard/order"
                      element={<TotalOrder dark={dark} />}
                    />
                    <Route
                      path="/admin-dashboard/onlineOrder"
                      element={<OnlineOrder dark={dark} />}
                    />
                    <Route
                      path="/admin-dashboard/offlineOrder"
                      element={<OfflineOrder dark={dark} />}
                    />
                    <Route
                      path="/admin-dashboard/cancelOrder"
                      element={<CancelOrder dark={dark} />}
                    />
                    <Route
                      path="/admin-dashboard/delieverOrder"
                      element={<DelieverOrder dark={dark} />}
                    />
                  </React.Fragment>
                )}
                <Route
                  path="/user/paymentSuccess"
                  element={<PaymentSuccess />}
                />
                <Route
                  path="/user/myOrder"
                  element={isAuthenticate === true && <MayOrder />}
                />
              </React.Fragment>
            )}
            <Route path="/cart" element={<Cart />} />
            <Route path="/load" element={<Loader />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
