import { createReducer } from "@reduxjs/toolkit";
import { clearError, clearMessage, deleteOrderFail, deleteOrderRequest, deleteOrderSuccess, getAllOrderFail, getAllOrderRequest, getAllOrderSuccess, getMyOrderFail, getMyOrderRequest, getMyOrderSuccess, orderFail, orderRequest, orderSuccess, updateAdminOrderFail, updateAdminOrderRequest, updateAdminOrderSuccess } from "../action-types/orderActionType";

export const selectMyOrder = (state) => state.orderReducer?.order;
// export const selectAllOrder = (state) => state.orderReducer?.orders;

export const orderReducer = createReducer({
    loading: false,
    message: null,
    error: null,
    order: [],
    orders: []
}, (builder) => {
    // for creating order
    builder.addCase(orderRequest, (state) => {
        state.loading = true;
    })
        .addCase(orderSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })

        .addCase(orderFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // for my order
        builder.addCase(getMyOrderRequest, (state) => {
            state.loading = true;
        })

        .addCase(getMyOrderSuccess, (state, action) => {
            state.loading = false;
            state.order = action.payload;
        })
        .addCase(getMyOrderFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // for getting order
        builder.addCase(getAllOrderRequest, (state) => {
            state.loading = true;
        })
        .addCase(getAllOrderSuccess, (state, action) => {
            state.loading = false;
            state.orders = action.payload.order;
            state.totalRevenu = action.payload.totalRevenu;
        })
        .addCase(getAllOrderFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        // for updating order
        builder.addCase(updateAdminOrderRequest, (state) => {
            state.loading = true;
        })
        .addCase(updateAdminOrderSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateAdminOrderFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // deleting order
        builder.addCase(deleteOrderRequest, (state) => {
            state.loading = true;
        })
        .addCase(deleteOrderSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteOrderFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(clearError, (state) => {
            state.error = null;
        })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
})