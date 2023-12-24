import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LoginLoader from "../../UI/loginLoader";
import { FcGoogle } from "react-icons/fc";
import {useDispatch} from 'react-redux'
import { loadUser, loginUser } from "../../../redux/action/authAction";

function Login({ dark }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
      
  const dispatch = useDispatch();

  const handleGoogleLogin = () => {
      window.location.href = "/auth/google";
  };
  // console.log(handleGoogleLogin)

  const onLogin = async (e) => {
    e.preventDefault();
    try { 
      setLoad(true)

   await dispatch(loginUser(email,password));
   await dispatch(loadUser());
      navigate(location.state || "/");
      toast.success("Login successfully");
      setLoad(false)
    } catch (error) {
      console.log(error);
      toast.error(" invalid email or password !!!");
      setLoad(false)
      setTimeout(()=>{
       navigate("/signUp");
      },1500)
     
    }
  };
  return (  
   
    <div
      className={`modal_background ${
        !dark ? " modal_background " : "modal_background_1 "
      }`}
    >
      <Form
        className={`form_login ${!dark ? "form_login" : "form_login_1"} `}
        onSubmit={onLogin}
      >
        <h4>Login</h4>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder=" Enter your Password"
        />{" "}
        <br />
        <Link to={"/Login/forgot_password"}>Forgot password</Link>
        <br />
       
        <button style={{padding:"5px 15px"}} type="submit">  {load ? <LoginLoader /> :   "Login"}
        
        </button>
        <br />
        <Link onClick={handleGoogleLogin}>Login with Google <FcGoogle style={{justifyContent:"center", fontSize:"25px", cursor:"pointer",  }} /></Link><br />
        <p>
          if you Don't have any accout.
          <Link to={"/signUp"}>Sign Up</Link>
        </p>
      </Form>
    </div>
  
  );
}

export default Login;
