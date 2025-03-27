import { useState } from "react";
import { toast } from "react-toastify";

function AddComment() {
  const [comment, setComment] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (comment.trim() === "") return toast.error("Please write something!");
    toast.success(comment);
    setComment("");
  };
  return (
    <form onSubmit={formSubmitHandler} className="my-[30px] mx-0">
      <input
        className="w-full text-[21px] border-none p-[10px] mb-[10px] rounded-[5px] bg-[#f0f0f0]"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
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
