import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import swal from "sweetalert";

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      swal({
        title: `Welcome ${data.userWithoutPassword.username}, you've logged in successfully`,
        icon: "success",
      });
    } catch (error) {
      toast.error(error.response.data?.message);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}
