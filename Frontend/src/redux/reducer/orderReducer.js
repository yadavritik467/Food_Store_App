import { createReducer } from "@reduxjs/toolkit";

export const orderReducer = createReducer({}, {
    // for creating order
    orderRequest: (state) => {
        state.loading = true;
    },
    orderSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    orderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for my order
    getMyOrderRequest: (state) => {
        state.loading = true;
    },
    getMyOrderSuccess: (state, action) => {
        state.loading = false;
        state.order = action.payload;
    },
    getMyOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for getting order
    getAllOrderRequest: (state) => {
        state.loading = true;
    },
    getAllOrderSuccess: (state, action) => {
        state.loading = false;
        state.orders = action.payload.order;
        state.totalRevenu = action.payload.totalRevenu;
    },
    getAllOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for updating order
    updateAdminOrderRequest: (state) => {
        state.loading = true;
    },
    updateAdminOrderSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateAdminOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // deleting order
    deleteOrderRequest: (state) => {
        state.loading = true;
    },
    deleteOrderSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteOrderFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    clearError: (state) => {
        state.error = null;
    },
    clearMessage: (state) => {
        state.message = null;
    },
})