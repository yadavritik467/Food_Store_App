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
import ResetPassword from "./components/pages/auth/ResetPassword";
import { loadUser } from "./redux/action/authAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/UI/Loader";
import ReactGA from 'react-ga';

const Home = React.lazy(() => import("./Home"));
const SearchAllFood = React.lazy(() => import("./components/pages/foods/searchAllFood"));
const Login = React.lazy(() => import("./components/pages/auth/Login"));
const SignUp = React.lazy(() => import("./components/pages/auth/SignUp"));
const MyProfile = React.lazy(() => import("./components/pages/auth/MyProfile"));
const MayOrder = React.lazy(() => import("./components/pages/order/mayOrder"));

// for admin
const Dashboard = React.lazy(() =>
  import("./components/pages/admin/dashboard")
);
const TotalOrder = React.lazy(() =>
  import("./components/pages/admin/adminOrder/totalOrder")
);
const OnlineOrder = React.lazy(() =>
  import("./components/pages/admin/adminOrder/onlineOrder")
);
const OfflineOrder = React.lazy(() =>
  import("./components/pages/admin/adminOrder/offlineOrder")
);
const CancelOrder = React.lazy(() =>
  import("./components/pages/admin/adminOrder/cancelOrder")
);
const DelieverOrder = React.lazy(() =>
  import("./components/pages/admin/adminOrder/delieverOrder")
);

function App({ state }) {
  const [dark, setDark] = useState(false);
  const { isAuthenticate, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  ReactGA.initialize('G-YG66C60VXS');
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  //------------------------------------------------------------------------  dark mode here
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
    dispatch(loadUser());
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

            <Route path="/searchFood" element={<Suspense fallback={<Loader />}>
                  <SearchAllFood dark={dark} />
                </Suspense>} />
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
                      element={
                        <Suspense fallback={<Loader />}>
                          <Dashboard dark={dark} />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin-dashboard/order"
                      element={
                        <Suspense fallback={<Loader />}>
                          <TotalOrder dark={dark} />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin-dashboard/onlineOrder"
                      element={
                        <Suspense fallback={<Loader />}>
                          <OnlineOrder dark={dark} />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin-dashboard/offlineOrder"
                      element={
                        <Suspense fallback={<Loader />}>
                          <OfflineOrder dark={dark} />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin-dashboard/cancelOrder"
                      element={
                        <Suspense fallback={<Loader />}>
                          <CancelOrder dark={dark} />
                        </Suspense>
                      }
                    />
                    <Route
                      path="/admin-dashboard/delieverOrder"
                      element={
                        <Suspense fallback={<Loader />}>
                          <DelieverOrder dark={dark} />
                        </Suspense>
                      }
                    />
                  </React.Fragment>
                )}
                <Route
                  path="/user/paymentSuccess"
                  element={<PaymentSuccess />}
                />
               
              </React.Fragment>
            )}
             <Route
                  path="/user/myOrder"
                  element={
                    <Suspense fallback={<Loader />}>
                     {isAuthenticate === true ?  <MayOrder dark={dark} /> : <Login dark={dark}/>}
                    </Suspense>  
                  }
                />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;