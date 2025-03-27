import { postsActions } from "../slices/postsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);

      dispatch(postsActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Fetch Posts Based On Category
export function fetchPostsBasedOnCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?category=${category}`);

      dispatch(postsActions.setPostsBasedOnCategory(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Get Posts Count
export function getPostsCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);

      dispatch(postsActions.setPostsCount(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
          "Content-Type": "multipart/form-data", 
        }
      });

      dispatch(postsActions.setIsPostCreated());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}