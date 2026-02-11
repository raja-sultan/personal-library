// loginAsSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { authAPI } from "@services/auth-api";
import { loginSuccess } from "./extra-reducers";

const initialState = {
    loginAs: '',
};

const slice = createSlice({
    name: "login-as",
    initialState,
    reducers: {
        loginAs: (state, action) => {
            state.loginAs = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addMatcher(authAPI.endpoints.login.matchFulfilled, loginSuccess);
    },
});

export const loginAsAction = slice.actions;
export const loginAsReducer = slice.reducer;
