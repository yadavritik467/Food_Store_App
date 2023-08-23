import React, {  useState } from "react";
import "./Common.css";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loader from "../UI/loginLoader";
import { useAuth } from "../../context/auth";

const MyProfile = () => {
  const [load, setLoad] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [id, setId] = useState("");
  const [auth] = useAuth();

 
  console.log(auth.user)

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const openModal = (_id) => {
    setUpdateModal(true);
    setId(_id);
  };

  const updateHandler = async () => {
    try {
      setLoad(true);
      await axios.put(`/auth/updateProfile/${id}`, {
        name,
        number,
        email,
        address,
      });
      setName("");
      setNumber("");
      setEmail("");
      setAddress("");
      setLoad(false);
      toast.success("profile updated");
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
  };

  
  return (
    <div style={{ width: "100%", height: "80vh" }}>
     
            {auth.user !== null && <div className="profile">
              {load === true ? (
                <Loader />
              ) : (
                <div>
                  <p>
                    Name: <b>{auth.user.name}</b>
                  </p>
                  <p>
                    Email: <b>{auth.user.email}</b>
                  </p>
                  <p>
                    Number: <b>{auth.user.number}</b>
                  </p>
                  <p>
                    Address: <b>{auth.user.address}</b>
                  </p>
                  <button onClick={() => openModal(auth.user._id)}>
                    Update Details
                  </button>{" "}
                  <br /> 
                   {updateModal === true && auth.user.access === "registerForm" && (
                    <div className="profile_1">
                      <div>
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                        />
                        <input
                          required
                          type="number"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          placeholder="Enter your number"
                        />
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                        />
                        <input
                          required
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your address"
                        />
                        <button onClick={updateHandler}> update</button>
                        <button onClick={() => setUpdateModal(false)}>
                          {" "}
                          cancle
                        </button>
                      </div>
                    </div>
                  )}
                  {updateModal === true && auth.user.access === "google" && (
                    <div className="profile_1">
                      <div>
                        
                        <input
                          required
                          type="number"
                          value={number}
                          onChange={(e) => setNumber(e.target.value)}
                          placeholder="Enter your number"
                        />
                        
                        <input
                          required
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your address"
                        />
                        <button onClick={updateHandler}> update</button>
                        <button onClick={() => setUpdateModal(false)}>
                          {" "}
                          cancle
                        </button>
                      </div>
                    </div>
                  )} 
                 
                </div>
              )}
            </div>}
          
    </div>
  );
};

export default MyProfile;
