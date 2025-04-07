import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createComment } from "../redux/apiCalls/commentsApiCalls";

function AddComment({postId}) {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") return toast.error("Please write something!");
    dispatch(createComment({text, postId}));
    setText("");
  };
  return (
    <form onSubmit={formSubmitHandler} className="my-[30px] mx-0">
      <input
        className="w-full text-[21px] border-none p-[10px] mb-[10px] rounded-[5px] bg-[#f0f0f0]"
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Add a comment"
      />
      <button
        type="submit"
        className="bg-primary text-white text-lg py-[5px] px-[10px] rounded-[20px] border-none"
      >
        Comment
      </button>
    </form>
  );
}
export default AddComment;
