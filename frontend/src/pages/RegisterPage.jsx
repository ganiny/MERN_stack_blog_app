import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/apiCalls/authApiCalls";
import swal from "sweetalert";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const {registerMessage} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (username.trim() === "") return toast.error("Username is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (confirmPassword.trim() === "") return toast.error("Confirm Password is required");

    if (password === confirmPassword){
      dispatch(registerUser({ username, email, password }));
    }else{
      toast.error("Password didn't match, confirm it again!");
    }
  };
  if(registerMessage){
    swal({
      title: registerMessage,
      icon: "success",
    }).then(isOk => {
      if(isOk){
        navigate("/login");
      }
    });
  }
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col p-[15px]">
      <h1 className="text-3xl text-primary mb-[15px]">Create new account</h1>
      <form onSubmit={formSubmitHandler} className="w-full sm:w-[500px]">
        <div className="mb-[15px] flex flex-col items-start">
          <label
            className="m-[5px] text-[15px] font-medium text-secondary"
            htmlFor="username"
          >
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-[10px] border border-gray text-[21px] p-[10px]"
            type="text"
            id="username"
            placeholder="Enter your username"
          />
        </div>
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
          Register
        </button>
      </form>
      <div className="my-[10px] mx-0 text-[17px] text-dark">
        Already have an account?{" "}
        <Link className="underline underline-offset-2 text-blue" to={"/login"}>
          Login
        </Link>
      </div>
    </section>
  );
}
export default RegisterPage;
