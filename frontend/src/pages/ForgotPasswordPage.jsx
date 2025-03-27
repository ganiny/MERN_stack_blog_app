import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") return toast.error("Email is required");

    console.log({ email });
  };
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col p-[15px]">
      <h1 className="text-3xl text-primary mb-[15px]">Forgot Password</h1>
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
        <button
          className="w-full text-center bg-primary border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Send email
        </button>
      </form>
    </section>
  );
}
export default ForgotPasswordPage;
