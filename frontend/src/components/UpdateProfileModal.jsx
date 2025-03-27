import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfile } from "../redux/apiCalls/profileApiCalls";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function UpdateProfileModal({ setUpdateProfile, profile }) {
  const [username, setUsername] = useState(profile?.username);
  const [bio, setBio] = useState(profile?.bio);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = { username, bio };

    if (password.trim() !== "" && password !== confirmPassword) {
      toast.error("Password didn't match, confirm it again!");
      return;
    }
    if (password.trim() !== "" && password === confirmPassword) {
      updatedUser.password = password;
    }

    dispatch(updateProfile(profile?._id, updatedUser));
    setUpdateProfile(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000b3] z-[999] flex items-center justify-center">
      <form
        onSubmit={formSubmitHandler}
        className="w-[90%] lg:w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]"
      >
        <abbr title="close">
          <i
            onClick={() => setUpdateProfile(false)}
            className="bi bi-x-circle-fill absolute top-[5px] right-[5px] text-red cursor-pointer text-[30px]"
          ></i>
        </abbr>
        <h1 className="mb-[10px] text-2xl text-greenSea text-center">
          Update Profile
        </h1>
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="text"
          placeholder="Username - Optional"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="text"
          placeholder="Bio - Optional"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
          }}
        />
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="password"
          placeholder="New Password - Optional"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />

        <button
          className="w-full text-center bg-greenSea border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}
export default UpdateProfileModal;
