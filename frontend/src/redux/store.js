import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        posts: postsReducer,
    }
});

export default store;
