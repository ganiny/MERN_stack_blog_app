import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);

      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        newPhoto,
        {
          headers: {
            Authorization: `Bearer ${getState().auth?.user?.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      toast.success(data.message);

      // Modify user photo in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.userWithoutPassword.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// Update Profile
export function updateProfile(userId, newProfile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        newProfile,
        {
          headers: {
            Authorization: `Bearer ${getState().auth?.user?.token}`,
          },
        }
      );

      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));

      // Modify user photo in local storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.userWithoutPassword.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
