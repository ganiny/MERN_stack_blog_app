/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../redux/apiCalls/authApiCalls";

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);
  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);


  return (
    <section className="h-[calc(100vh-130px)] w-full flex flex-col justify-center items-center">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check text-[80px] text-green"></i>
          <h1 className="text-[32px] m-5 text-green">
            Your email address has been successfully verified
          </h1>
          <Link
            className="text-2xl font-semibold bg-primary p-[5px] rounded-[5px] text-white"
            to={"/login"}
          >
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <h1 className="text-[40px] text-red">Not Found</h1>
        </>
      )}
    </section>
  );
}
export default VerifyEmailPage;
