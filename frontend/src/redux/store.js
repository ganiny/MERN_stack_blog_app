import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postsReducer } from "./slices/postsSlice";
import { categoriesReducer } from "./slices/categoriesSlice";
import { commentsReducer } from "./slices/commentsSlice";
import { passwordReducer } from "./slices/passwordSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        posts: postsReducer,
        categories: categoriesReducer,
        comments: commentsReducer,
        password: passwordReducer,
    }
});

export default store;
