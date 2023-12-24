import { createReducer } from "@reduxjs/toolkit";
import { clearError, clearMessage } from "../action-types/orderActionType";
import { deleteFoodsFail, deleteFoodsRequest, deleteFoodsSuccess, foodsFail, foodsRequest, foodsSuccess, getAllFoodsFail, getAllFoodsRequest, getAllFoodsSuccess, updateFoodsFail, updateFoodsRequest, updateFoodsSuccess } from "../action-types/foodActionType";

export const foodReducer = createReducer({
    foods: [],
    loading: false,
    loaded:false,
    message: null,
    error: null,
}, (builder) => {
    // for creating foods
    builder.addCase(foodsRequest, (state) => {
        state.loading = true;
    })
        .addCase(foodsSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(foodsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    // for getting foods
    builder.addCase(getAllFoodsRequest, (state) => {
        state.loading = true;
    })
        .addCase(getAllFoodsSuccess, (state, action) => {
            state.loading = false;
            state.foods = action.payload;
            state.loaded = true
        })
        .addCase(getAllFoodsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    // for updating foods
    builder.addCase(updateFoodsRequest, (state) => {
        state.loading = true;
    })
        .addCase(updateFoodsSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(updateFoodsFail, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

    // deleting foods
    builder.addCase(deleteFoodsRequest, (state) => {
        state.loading = true;
    })
        .addCase(deleteFoodsSuccess, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(deleteFoodsFail, (state, action) => {
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
