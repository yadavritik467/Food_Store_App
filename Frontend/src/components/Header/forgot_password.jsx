import React, { useState } from "react";
import LoginLoader from "../UI/loginLoader";
import axios from "axios";
import { toast } from "react-hot-toast";

const Forgot_password = ({ dark }) => {
  const [email, setEmail] = useState("");

 
  // `Password successfully changed !! now `
  const [load, setLoad] = useState(false);
  const forgot_password = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/forgotPassword", {
        email,
      });

    
      toast.success(`Link has been sent to this email ${email}` )
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoad(false)
    }
  };
  return (
    <div style={{height:"75vh",display: 'flex',justifyContent:"center",alignItems:"center",}}>
<div
        style={{  }}
    >
      <div
         style={{display: 'flex', flexDirection:"column", padding:"30px", boxShadow:"15px 15px 15px rgba(0,0,0,0.289)",
          justifyContent:"center",alignItems:"center", border: '1px solid lightgrey'}}
      >
       
          <div>
            <h4>Reset password</h4> <br />
            <input
              type="email"
              name="email"
              value={email}
              required
              style={{border:"1px solid grey ",outline:"none", padding:"8px"}}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
               <br />  <br />
            <button style={{padding:"8px"}} onClick={forgot_password}>
              {" "}
              {load ? <LoginLoader /> : "Send link"}
            </button>
          </div>
        

        <br />
      </div>
    </div>

    </div>
  );
};

export default Forgot_password;
