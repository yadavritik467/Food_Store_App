import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const params = useParams();
    // console.log(params)
  const navigate = useNavigate();

    const resetPasswordHandler =async(e) =>{
        e.preventDefault();
        try {
              axios.put(`/auth/password/reset/${params.token}`,{
                newPassword
            })
            
                toast.success("password updated successfully, now login");
                navigate("/login")
            
        } catch (error) {
            console.log(error.message)
        }
    }


  return (
    <div
    style={{
      height: "75vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "30px",
          boxShadow: "15px 15px 15px rgba(0,0,0,0.289)",
          justifyContent: "center",
          alignItems: "center",
          // border: "1px solid lightgrey",
        }}
      >
       <div  >
      <input type="password" placeholder='Enter your new password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} /> <br /> <br />
      <button onClick={resetPasswordHandler}>reset password</button> <br /> <br />
      <Link to={"/forgotPassword"} >Request another link</Link>
    </div>

        <br />
      </div>
    
  </div>
    
  )
}

export default ResetPassword
