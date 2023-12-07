import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
    {
        loading: false,
        isAuthenticate: false,
        user: null,
        users:null,
        error: null,
        message: null
    },
    {
        // sign up
        signUpRequest: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        signUpFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // login 
        loginRequest: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        loginFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // my profile
        loadUserRequest: (state) => {
            state.loading = true;
            state.isAuthenticate =false;
        },
        loadUserSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticate = true;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.isAuthenticate = false;
            state.user = null;
            state.error = action.payload;
        },

        // update profile 
        updateProfileRequest: (state) => {
            state.loading = true;
        },
        updateProfileSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateProfileFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete users 
        deleteUserRequest: (state) => {
            state.loading = true;
        },
        deleteUserSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // allUsers
        allUserRequest: (state) => {
            state.loading = true;
        },
        allUserSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        allUserFail: (state, action) => {
            state.loading = false;
            state.users = null;
            state.error = action.payload;
        },

        //   for logout 
        logoutRequest: (state) => {
            state.loading = true;
        },
        logoutSuccess: (state, action) => {
            state.loading = false;
            state.isAuthenticate = false;
            state.message = action.payload;
            state.user = null;
        },
        logoutFail: (state, action) => {
            state.loading = false;
            state.isAuthenticate = true;
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = null;
        },
    }
)