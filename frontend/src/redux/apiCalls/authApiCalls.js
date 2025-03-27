import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import swal from "sweetalert";

// register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      swal({
        title: `Welcome ${data.userWithoutPassword.username}, you've registered and logged in successfully`,
        icon: "success",
      });
    } catch (error) {
      toast.error(error.response.data.message);
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
      toast.error(error.response.data.message);
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
