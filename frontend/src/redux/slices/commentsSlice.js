import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        comments: [],
    },
    reducers: {
        setComments(state, action){
            state.comments = action.payload;
        },
        deleteComment(state, action){
            state.comments = state.comments.filter(comment => comment._id !== action.payload)
        }
    }
});

const commentsReducer = commentsSlice.reducer;
const commentsActions = commentsSlice.actions;

export {commentsActions, commentsReducer};