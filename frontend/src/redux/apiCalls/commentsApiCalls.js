import { postsActions } from "../slices/postsSlice";
import { commentsActions } from "../slices/commentsSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Create Comment
export function createComment(comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post("/api/comments", comment, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });

      dispatch(postsActions.addCommentToPost(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Update Comment
export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: {
            Authorization: `Bearer ${getState().auth?.user?.token}`,
          },
        }
      );

      dispatch(postsActions.updateCommentPost(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Delete Comment
export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });

      dispatch(commentsActions.deleteComment(commentId));
      dispatch(postsActions.deleteCommentFromPost(commentId));
      toast.success(data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Fetch All Comments
export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: `Bearer ${getState().auth?.user?.token}`,
        },
      });

      dispatch(commentsActions.setComments(data));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}
