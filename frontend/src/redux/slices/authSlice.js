import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    },
    reducers: {
        register(state, action) {
            state.user = action.payload;
        },
        login(state, action) {
            state.user = action.payload;
        },
        logout(state) {
            state.user = null;
        },
        setUserPhoto(state, action) {
            state.user.userWithoutPassword.profilePhoto = action.payload;
        },
        setUsername(state, action) {
            state.user.userWithoutPassword.username = action.payload;
        },
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export {authActions, authReducer};