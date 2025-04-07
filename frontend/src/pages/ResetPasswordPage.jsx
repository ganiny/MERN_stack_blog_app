/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../redux/apiCalls/passwordApiCalls";

function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") return toast.error("Password is required");
    if (confirmPassword.trim() === "")
      return toast.error("Confirm Password is required");

    if (password === confirmPassword) {
      dispatch(resetPassword(password, { userId, token }));
      navigate("/login");
    } else {
      toast.error("Password didn't match, confirm it again!");
    }
  };
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col p-[15px]">
      {isError ? (
        <h1 className="text-[40px] text-red">Not Found</h1>
      ) : (
        <>
          <h1 className="text-3xl text-primary mb-[15px]">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="w-full sm:w-[500px]">
            <div className="mb-[15px] flex flex-col items-start">
              <label
                className="m-[5px] text-[15px] font-medium text-secondary"
                htmlFor="password"
              >
                New Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-[10px] border border-gray text-[21px] p-[10px]"
                type="password"
                id="password"
                placeholder="Enter your new password"
              />
            </div>
            <div className="mb-[15px] flex flex-col items-start">
              <label
                className="m-[5px] text-[15px] font-medium text-secondary"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-[10px] border border-gray text-[21px] p-[10px]"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
              />
            </div>
            <button
              className="w-full text-center bg-primary border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
              type="submit"
            >
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
}
export default ResetPasswordPage;
