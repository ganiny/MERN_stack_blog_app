import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/apiCalls/authApiCalls";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(loginUser({ email, password }));
  };
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col p-[15px]">
      <h1 className="text-3xl text-primary mb-[15px]">Login to your account</h1>
      <form onSubmit={formSubmitHandler} className="w-full sm:w-[500px]">
        <div className="mb-[15px] flex flex-col items-start">
          <label
            className="m-[5px] text-[15px] font-medium text-secondary"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[10px] border border-gray text-[21px] p-[10px]"
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-[15px] flex flex-col items-start">
          <label
            className="m-[5px] text-[15px] font-medium text-secondary"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-[10px] border border-gray text-[21px] p-[10px]"
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="w-full text-center bg-primary border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Login
        </button>
      </form>
      <div className="my-[10px] mx-0 text-[17px] text-dark">
        Did you forget your password?{" "}
        <Link
          className="underline underline-offset-2 text-blue"
          to={"/forgot-password"}
        >
          Forgot password
        </Link>
      </div>
    </section>
  );
}
export default LoginPage;
