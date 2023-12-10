import { createReducer } from "@reduxjs/toolkit";

export const carouselReducer = createReducer({
    carousel: [],
    loading: false,
    message: null,
    error: null,
}, {
    // for creating carousel
    carouselRequest: (state) => {
        state.loading = true;
    },
    carouselSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    carouselFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // for getting carousel
    getAllCarouselRequest: (state) => {
        state.loading = true;
    },
    getAllCarouselSuccess: (state, action) => {
        state.loading = false;
        state.carousel = action.payload;
    },
    getAllCarouselFail: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    // deleting carousel
    deleteCarouselRequest: (state) => {
        state.loading = true;
    },
    deleteCarouselSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    deleteCarouselFail: (state, action) => {
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
