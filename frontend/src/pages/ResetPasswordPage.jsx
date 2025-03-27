import { useState } from "react";
import { toast } from "react-toastify";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") return toast.error("Password is required");

    console.log({ password });
  };
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col p-[15px]">
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
        <button
          className="w-full text-center bg-primary border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
export default ResetPasswordPage;
