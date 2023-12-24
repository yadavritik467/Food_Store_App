import { createReducer } from "@reduxjs/toolkit";
import { clearError, clearMessage } from "../action-types/orderActionType";
import { carouselFail, carouselRequest, carouselSuccess, deleteCarouselFail, deleteCarouselRequest, deleteCarouselSuccess, getAllCarouselFail, getAllCarouselRequest, getAllCarouselSuccess } from "../action-types/carousleActionType";

export const carouselReducer = createReducer({
    carousel: [],
    loading: false,
    message: null,
    error: null,
}, (builder) => {
    // for creating carousel
    builder.addCase(carouselRequest, (state) => {
        state.loading = true;
    })
        .addCase(carouselSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(carouselFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    // for getting carousel
    builder.addCase(getAllCarouselRequest, (state) => {
        state.loading = true;
    })
        .addCase(getAllCarouselSuccess, (state, action) => {
            state.loading = false;
            state.carousel = action.payload;
        })
        .addCase(getAllCarouselFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    // deleting carousel
    builder.addCase(deleteCarouselRequest, (state) => {
        state.loading = true;
    })
        .addCase(deleteCarouselSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteCarouselFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    builder.addCase(clearError, (state) => {
        state.error = null;
    })
        .addCase(clearMessage, (state) => {
            state.message = null;
        });
})
