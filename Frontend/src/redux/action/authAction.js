
import axios from 'axios';

export const signUpUser = (name, number, cpassword, email, password, address) => async (dispatch) => {
    try {
        dispatch({
            type: 'signUpRequest'
        })

        const { data } = await axios.post(`/auth/register`, {
            name, number, cpassword, email, password, address
        })

        console.log(data)
        dispatch({
            type: 'signUpSuccess',
            payload: data.message
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: "signUpFail",
            payload: error.response.data.message,
        });
    }
}

// for login 
export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: 'loginRequest'
        })

        const { data } = await axios.post(`/auth/login`, {
            email, password
        },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        dispatch({
            type: 'loginSuccess',
            payload: data
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "loginFail",
            payload: error.response.data.message,
        });
    }
}

// for my profile
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'loadUserRequest'
        })
        const { data } = await axios.get(`/auth/myProfile`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        dispatch({
            type: 'loadUserSuccess',
            payload: data.user
        })
    } catch (error) {
        console.log(error)
        if(error.response.status === 401){
            dispatch({
                type: 'loadUserSuccess',
                payload: null
            })
        }else{

            dispatch({
                type: "loadUserFail",
                payload: error.response.data.message,
            });
        }
    }
}

// for logOut  
export const logOutUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'logoutRequest'
        })
        const { data } = await axios.get("/auth/logout", {
            withCredentials: true
        })
        dispatch({
            type: 'logoutSuccess',
            payload: data.message
        })
    } catch (error) {
        dispatch({
            type: "logoutFail",
            payload: error.response.data.message,
        });
    }
}


// for all users 
export const allUser = () => async (dispatch) => {
    try {
        dispatch({
            type: 'allUserRequest'
        })
        const { data } = await axios.get(`/auth/getUser`, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          });
        dispatch({
            type: 'allUserSuccess',
            payload: data.user
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: "allUserFail",
            payload: error.response.data.message,
        });
    }
}

// for updating profile

export const updateProfile =(name,number,email,address) => async(dispatch) =>{
    try {
        dispatch({
            type:'updateProfileRequest'
        })
        const { data } = await axios.put("/auth/updateProfile",{name,number,email,address}, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          })

        dispatch({
            type:'updateProfileSuccess',
            payload:data
        })
    } catch (error) {
        dispatch({
            type: "allUserFail",
            payload: error.response.data.message,
        });
    }
}

// for deleting user

export const deleteUser =(id) => async(dispatch) =>{
    try {
        dispatch({
            type: "deleteUserRequest",
        });
        const {data} = axios.delete(`/auth/delete-users/${id}`)

        dispatch({
            type: "deleteUserSuccess",
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: "deleteUserFail",
            payload: error.response.data.message,
        });
    }
} 