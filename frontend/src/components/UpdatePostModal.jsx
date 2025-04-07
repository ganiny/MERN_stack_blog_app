import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../redux/apiCalls/postsApiCalls";
import { fetchCategories } from "../redux/apiCalls/categoriesApiCalls";

/* eslint-disable react/prop-types */
function UpdatePostModal({ setUpdatePost, post }) {
  const [title, setTitle] = useState(post?.title);
  const [description, setDescription] = useState(post?.description);
  const [category, setCategory] = useState(post?.category);

  const { categories } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
        dispatch(fetchCategories());
      }, []);
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#000000b3] z-[999] flex items-center justify-center">
      <form
        onSubmit={formSubmitHandler}
        className="w-[90%] lg:w-[700px] bg-white p-[15px] flex flex-col relative rounded-[10px]"
      >
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill absolute top-[5px] right-[5px] text-red cursor-pointer text-[30px]"
          ></i>
        </abbr>
        <h1 className="mb-[10px] text-2xl text-greenSea text-center">
          Update Post
        </h1>
        <input
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="w-full rounded-[10px] border border-gray text-[21px] p-[10px] my-[5px] mx-0"
        >
          <option disabled value="">
            Select A Category
          </option>
          {categories?.map((category) => (
            <option key={category?._id} value={category?.title}>
              {category?.title}
            </option>
          ))}
        </select>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Post Description"
          className="w-full rounded-[10px] text-[21px] border border-gray p-[10px] my-[10px] mx-0"
          rows={5}
        ></textarea>
        <button
          className="w-full text-center bg-greenSea border-none text-[21px] font-medium text-white rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}
export default UpdatePostModal;
