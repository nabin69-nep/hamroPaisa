import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currency"
export const store=configureStore({
    reducer:{
        currency:currencyReducer,
    }
})