import { useState } from "react";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
function UpdateCommentModal({ setUpdateComment }) {

  const [text, setText] = useState("This is amazing post!");
  

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("Comment Text is required");
    

    console.log({ text });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000b3] z-[999] flex items-center justify-center">
      <form onSubmit={formSubmitHandler} className="w-[90%] lg:w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]">
        <abbr title="close">
          <i
            onClick={() => setUpdateComment(false)}
            className="bi bi-x-circle-fill absolute top-[5px] right-[5px] text-red cursor-pointer text-[30px]"
          ></i>
        </abbr>
        <h1 className="mb-[10px] text-2xl text-greenSea text-center">
          Update Comment
        </h1>
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="text"
          placeholder="Comment"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button
          className="w-full text-center bg-greenSea border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Edit Comment
        </button>
      </form>
    </div>
  );
}
export default UpdateCommentModal;
