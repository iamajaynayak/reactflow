import { configureStore } from "@reduxjs/toolkit";
import flowSliceReducer from "./slices/flow.slice";

export const store = configureStore({
    reducer : {
        flow : flowSliceReducer
    }
})