import { createReducer } from "@reduxjs/toolkit";

export const foodReducer = createReducer({}, {
    // for creating foods
    foodsRequest: (state) => {
        state.loading = true;
    },
    foodsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    foodsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for getting foods
    getAllFoodsRequest: (state) => {
        state.loading = true;
    },
    getAllFoodsSuccess: (state, action) => {
        state.loading = false;
        state.foods = action.payload;
    },
    getAllFoodsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for updating foods
    updateFoodsRequest: (state) => {
        state.loading = true;
    },
    updateFoodsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    updateFoodsFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },

    // deleting foods
    deleteFoodsRequest: (state) => {
        state.loading = true;
    },
    deleteFoodsSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteFoodsFail: (state, action) => {
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