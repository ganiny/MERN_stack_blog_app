import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        postsCount: null,
        postsBasedOnCategory: [],
        loading: false,
        isPostCreated: false,
    },
    reducers: {
        setPosts(state, action){
            state.posts = action.payload;
        },
        setPostsCount(state, action){
            state.postsCount = action.payload;
        },
        setPostsBasedOnCategory(state, action){
            state.postsBasedOnCategory = action.payload;
        },
        setLoading(state){
            state.loading = true;
        },
        clearLoading(state){
            state.loading = false;
        },
        setIsPostCreated(state){
            state.isPostCreated = true;
            state.loading = false;
        },
        clearIsPostCreated(state){
            state.isPostCreated = false;
        },
    }
});

const postsReducer = postsSlice.reducer;
const postsActions = postsSlice.actions;

export {postsActions, postsReducer};