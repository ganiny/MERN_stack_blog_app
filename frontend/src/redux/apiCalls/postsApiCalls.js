import { postsActions } from "../slices/postsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Fetch All Posts
export function fetchAllPosts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts`);
      if(!data)return;

      dispatch(postsActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Fetch Posts Based On Page Number
export function fetchPosts(pageNumber) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);

      dispatch(postsActions.setPosts(data));
    } catch (error) {
      toast.error(error.response.data?.message);
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
      toast.error(error.response.data?.message);
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
      toast.error(error.response.data?.message);
    }
  };
}

// Create Post
export function createPost(newPost) {
  return async (dispatch, getState) => {
    try {
      dispatch(postsActions.setLoading());
      await request.post(`/api/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(postsActions.setIsPostCreated());
      setTimeout(() => dispatch(postsActions.clearIsPostCreated()), 2000);
    } catch (error) {
      toast.error(error.response.data?.message);
      dispatch(postsActions.clearLoading());
    }
  };
}

// Fetch Single Post
export function fetchSinglePost(postId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/${postId}`);

      dispatch(postsActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Toggle Post Likes
export function togglePostLikes(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/posts/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getState().auth?.user?.token}`,
          },
        }
      );

      dispatch(postsActions.setLike(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Update Post Image
export function updatePostImage(newImage, postId) {
  return async (dispatch, getState) => {
    try {
      await request.put(`/api/posts/update-image/${postId}`, newImage, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Post image updated successfully");
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Update Post
export function updatePost(newPost, postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`/api/posts/${postId}`, newPost, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });
      dispatch(postsActions.setPost(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Delete Post
export function deletePost(postId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });
      dispatch(postsActions.deletePost(data.postId));
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
