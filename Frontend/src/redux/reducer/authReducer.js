import { createReducer } from "@reduxjs/toolkit";
import { allUserFail, allUserRequest, allUserSuccess, deleteUserFail, deleteUserRequest, deleteUserSuccess, loadUserFail, loadUserRequest, loadUserSuccess, loginFail, loginRequest, loginSuccess, logoutFail, logoutRequest, logoutSuccess, signUpFail, signUpRequest, signUpSuccess, updateProfileFail, updateProfileRequest, updateProfileSuccess } from "../action-types/authActionType";
import { clearError, clearMessage } from "../action-types/orderActionType";

export const authReducer = createReducer(
    {
        loading: false,
        loaded: false,
        isAuthenticate: false,
        user: null,
        users: null,
        error: null,
        message: null
    },
    (builder) => {
        // sign up
        builder.addCase(signUpRequest, (state) => {
            state.loading = true;
        })
            .addCase(signUpSuccess, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(signUpFail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // login 
        builder.addCase(loginRequest, (state) => {
            state.loading = true;
        })
            .addCase(loginSuccess, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(loginFail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // my profile
        builder.addCase(loadUserRequest, (state) => {
            state.loading = true;
            state.isAuthenticate = false;
        })
            .addCase(loadUserSuccess, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.user = action.payload;
            })
            .addCase(loadUserFail, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.user = null;
                state.error = action.payload;
            })
        // update profile 
        builder.addCase(updateProfileRequest, (state) => {
            state.loading = true;
        })
            .addCase(updateProfileSuccess, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateProfileFail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        // delete users 
        builder.addCase(deleteUserRequest, (state) => {
            state.loading = true;
        })
            .addCase(deleteUserSuccess, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteUserFail, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // allUsers
        builder.addCase(allUserRequest, (state) => {
            state.loading = true;
        })
            .addCase(allUserSuccess, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.loaded =true
            })
            .addCase(allUserFail, (state, action) => {
                state.loading = false;
                state.users = null;
                state.error = action.payload;
            });

        //   for logout 
        builder.addCase(logoutRequest, (state) => {
            state.loading = true;
        })
            .addCase(logoutSuccess, (state, action) => {
                state.loading = false;
                state.isAuthenticate = false;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logoutFail, (state, action) => {
                state.loading = false;
                state.isAuthenticate = true;
                state.error = action.payload;
            });
        builder.addCase(clearError, (state) => {
            state.error = null;
        })
            .addCase(clearMessage, (state) => {
                state.message = null;
            });
    }
)