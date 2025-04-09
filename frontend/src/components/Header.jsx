import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCalls";

function Header() {
  const [toggle, setToggle] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth?.user?.userWithoutPassword);

  return (
    <header className="z-[99] border-b-2 border-white border-solid sticky top-0 w-full h-[80px] py-0 px-[10px] lg:px-8 flex items-center justify-between bg-blue">
      {/* Header Left */}
      <div className="flex flex-row-reverse items-center">
        <Link
          to={"/"}
          className="text-lg lg:text-3xl font-bold text-white underline"
        >
          <strong>BLOG</strong>
          <i className="bi bi-pencil"></i>
        </Link>
        <div
          onClick={() => {
            setToggle((prev) => !prev);
          }}
          className="lg:hidden mr-[10px] lg:mr-5 cursor-pointer"
        >
          {toggle ? (
            <i className="bi bi-x-lg text-[35px] text-white"></i>
          ) : (
            <i className="bi bi-list text-[40px] text-white"></i>
          )}
        </div>
      </div>

      {/* Header Navbar */}
      <nav
        className={`lg:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] max-lg:absolute max-lg:left-0 max-lg:top-full max-lg:w-full max-lg:bg-blue max-lg:transition-all max-lg:ease-in max-lg:duration-300 ${
          toggle
            ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "[clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <ul className="max-lg:flex max-lg:flex-col max-lg:items-start max-lg:justify-center max-lg:pl-8 lg:pl-0 lg:flex-row lg:justify-center lg:items-center">
          <Link
            to={"/"}
            onClick={() => {
              setToggle(false);
            }}
            className="my-0 mx-3 text-xl font-medium text-white hover:text-main m-0 mb-4"
          >
            <i className="bi bi-house mr-1 text-2xl"></i>
            Home
          </Link>
          <Link
            to={"/posts"}
            onClick={() => {
              setToggle(false);
            }}
            className="my-0 mx-3 text-xl font-medium text-white hover:text-main m-0 mb-4"
          >
            <i className="bi bi-stickies mr-1 text-2xl"></i>
            Posts
          </Link>
          {user && (
            <Link
              to={"/posts/create-post"}
              onClick={() => {
                setToggle(false);
              }}
              className="my-0 mx-3 text-xl font-medium text-white hover:text-main m-0 mb-4"
            >
              <i className="bi bi-journal-plus mr-1 text-2xl"></i>
              Create
            </Link>
          )}
          {user?.isAdmin && (
            <Link
              to={"/admin-dashboard"}
              onClick={() => {
                setToggle(false);
              }}
              className="my-0 mx-3 text-xl font-medium text-white hover:text-main m-0 mb-4"
            >
              <i className="bi bi-person-check mr-1 text-2xl"></i>
              Admin Dashboard
            </Link>
          )}
        </ul>
      </nav>

      {/* Header Right */}
      <div>
        {user ? (
          <>
            <div className="flex items-center relative">
              <span
                onClick={() => setDropdown((prev) => !prev)}
                className="text-[21px] font-medium text-main mr-[10px] capitalize cursor-pointer"
              >
                {user.username}
              </span>
              <img
                onClick={() => setDropdown((prev) => !prev)}
                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                src={user.profilePhoto.url}
                alt="user photo"
              />
              {dropdown && (
                <div className="absolute right-1/3 top-full bg-main border border-white rounded-[5px] p-[5px] w-[150px] text-left">
                  <Link
                    onClick={() => setDropdown(false)}
                    className="text-primary font-medium text-[21px] mt-[15px]"
                    to={`/profile/${user._id}`}
                  >
                    <i className="bi bi-file-person"></i>
                    <span>Profile</span>
                  </Link>
                  <div
                    onClick={() => {
                      setDropdown(false);
                      dispatch(logoutUser());
                    }}
                    className="text-primary font-medium text-[21px] mt-[15px] cursor-pointer"
                  >
                    <i className="bi bi-box-arrow-in-left"></i>
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              onClick={() => {
                setToggle(false);
              }}
              className="ml-[10px] text-sm md:text-base lg:text-xl font-medium bg-white text-blue rounded-[10px] py-[5px] px-[7px] lg:px-[10px] hover:bg-main"
            >
              <i className="bi bi-box-arrow-in-right mr-[5px]"></i>
              <span>Log in</span>
            </Link>
            <Link
              to={"/register"}
              onClick={() => {
                setToggle(false);
              }}
              className="ml-[10px] text-sm md:text-base lg:text-xl font-medium bg-white text-blue rounded-[10px] py-[5px] px-[7px] lg:px-[10px] hover:bg-main"
            >
              <i className="bi bi-person-plus mr-[5px]"></i>
              <span>Register</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
