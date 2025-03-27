import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("Post Title is required");
    if (category.trim() === "") return toast.error("Post Category is required");
    if (description.trim() === "")
      return toast.error("Post Description is required");
    if (!file) return toast.error("Post Image is required");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    //TODO - Send form data to server

    console.log({ title, category, description, file });
  };

  return (
    <section className="w-full h-[calc(100vh-130px)] flex flex-col items-center justify-center p-5">
      <h1 className="text-[30px] text-primary mb-[10px]">Create New Post</h1>
      <form
        onSubmit={formSubmitHandler}
        className="w-full md:w-[700px] flex flex-col"
      >
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-full rounded-[10px] border border-gray text-[21px] p-[10px] my-[5px] mx-0"
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
          <option value="music">music</option>
          <option value="coffee">coffee</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className="w-full rounded-[10px] border border-gray text-[21px] p-[10px] my-[5px] mx-0 resize-none"
          rows={5}
          placeholder="Post Description"
        ></textarea>
        <input
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          className="w-full rounded-[10px] border border-gray text-[21px] p-[10px] my-[5px] mx-0 bg-gray"
          type="file"
          name="file"
          id="file"
        />
        <button
          className="w-full text-center bg-primary text-white border-none text-[21px] font-medium rounded-[10px] p-[10px] mt-[15px]"
          type="submit"
        >
          Create
        </button>
      </form>
    </section>
  );
}
export default CreatePostPage;
