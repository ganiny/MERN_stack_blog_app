import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

const categoriesReducer = categoriesSlice.reducer;
const categoriesActions = categoriesSlice.actions;

export { categoriesActions, categoriesReducer };
