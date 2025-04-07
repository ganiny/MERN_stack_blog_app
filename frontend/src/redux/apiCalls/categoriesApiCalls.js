import { categoriesActions } from "../slices/categoriesSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch Categories
export function fetchCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/categories");

      dispatch(categoriesActions.setCategories(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Create Category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/categories", newCategory, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });

      dispatch(categoriesActions.addCategory(data));
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Delete Category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });

      dispatch(categoriesActions.deleteCategory(data?.categoryId));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
