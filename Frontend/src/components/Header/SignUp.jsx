import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../context/auth";
// import { FcGoogle } from "react-icons/fc";
import "./NavbarCo.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import LoginLoader from "../UI/loginLoader";

function SignUp({ dark, setDark }) {
  const [auth] =  useAuth()
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [address, setAddress] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {  
    e.preventDefault()
    if(password !== cpassword ){
      toast.error("password mismatched");
    }
    else{    
      try {
        setLoad(true);
        const {data} = await axios.post("/auth/register",{
          name,number,email,password,address
        })
        setLoad(false);
        if(data.existingUser){
          toast.error(data.message)
        }
        else if(data.existingNumber){
          toast.error(data.message)
        }
        else{
          toast.success("user created successfully, Now login!!")
          setTimeout(()=>{
            
            navigate("/login")
          },1500)

        }
      } catch (error) {
        console.error(error)
        setLoad(false)
      }
    }
  };


  return (
    <div
      className={`modal_background ${
        !dark ? "modal_background" : "modal_background_1"
      }`}
    >
      <Form
        className={`form_sign ${!dark ? "form_sign" : "form_sign_1"}  my-1`}
        onSubmit={handleSignUp}
      >
        <h4>Register </h4>

        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name.."
          required
        />

        <input
          type="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Enter your number"
          required
        />

        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
   

        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <input
          type="password"
          name="cpassword"
          value={cpassword}
          onChange={(e) => setCpassword(e.target.value)}
          placeholder="Confirm Password"
          required
        />

        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address"
          required
        />
        <br />

        <button style={{padding:"5px 15px"}} type="submit">
          {" "}
          {load ? <LoginLoader /> : " Sign Up"}
        </button>

        <p>
          Have an accout ?<Link to={"/login"}>Login</Link>
        </p>
      </Form>
    </div>
  );
}

export default SignUp;
