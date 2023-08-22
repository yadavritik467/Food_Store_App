import React, { useEffect } from "react";
import axios from "axios"

import { useContext, useState, createContext } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null
  });

  // console.log(auth)
  // const [user, setUser] = useState(null);
  // console.log(user)

  // Fetch user details from the server
  const fetchUser = async () => {
    try {
      const response = await axios.get('/auth/myProfile',{
        withCredentials: true,
      });
      // console.log(response)
      setAuth({...auth,user:response.data.user});
    } catch (error) {
      // console.error('Error fetching user:', error.message);
      setAuth({
        user:null
      })
    }
  };

  useEffect(() => {

  //  if(auth.user !== null ){
    fetchUser();
  //  }
  }, []);

 

  // useEffect(() => {
  //   // myProfile();
  //   const data = localStorage.getItem("userID");
  //   if (data) {
  //     const parseData = JSON.parse(data);
  //     setAuth({
  //       ...auth,
  //       user: parseData.user,
  //       token: parseData.token,
  //     });
  //   }
  // }, []);

  return (
    <React.StrictMode>
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
    </React.StrictMode>
  );
};

// custom hook

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
