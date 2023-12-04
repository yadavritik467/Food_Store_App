import React, { useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../UI/loginLoader";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../redux/action/authAction";

const MyProfile = () => {
  const {user}= useSelector((state)=>state.auth);
  const [load, setLoad] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const openModal = () => {
    setUpdateModal(true);
  };

  const updateHandler = async () => {
    try {
      setLoad(true);
      await dispatch(updateProfile(name,number,email,address))
      setName("");
      setNumber("");
      setEmail("");
      setAddress("");
      setUpdateModal(false);
      window.location.reload();
      setLoad(false);
      toast.success("profile updated, please refresh the  page");
    } catch (error) {
      console.error(error);
      toast.error("server error please wait or refresh");
      setLoad(false);
    }
  };

  

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      {user !== null &&
        <div className="profile">
        {load === true ? (
          <Loader />
        ) : (
          <div>
            <p>
              Name: <b>{user.name}</b>
            </p>
            <p>
              Email: <b>{user.email}</b>
            </p>
            <p>
              Number: <b>{user.number}</b>
            </p>
            <p>
              Address: <b>{user.address}</b>
            </p>
            <button onClick={() => openModal()}>
              Update Details
            </button>{" "}
            <br /> <br />
            {updateModal === true && user.access === "registerForm" && (
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
            {updateModal === true && user.access === "google" && (
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
      </div>
        }
    </div>
  );
};

export default MyProfile;
