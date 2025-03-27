import { useState } from "react";
import { toast } from "react-toastify";

function AddCategoryForm() {
  const [title, setTitle] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Category Title is required!");

    console.log({ title });
  };

  return (
    <div className="m-0 lg:my-[10px] lg:mx-auto mt-5 w-full lg:w-[700px] border border-gray rounded-[10px] p-[10px]">
      <h6 className="text-2xl font-semibold text-primary mb-[15px]">
        Add New Category
      </h6>
      <form onSubmit={formSubmitHandler}>
        <div className="mb-[15px] flex flex-col">
          <label
            className="m-[5px] text-[15px] font-semibold text-gray"
            htmlFor="title"
          >
            Category Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-[10px] border border-gray rounded-[10px] text-[21px]"
            type="text"
            id="title"
            placeholder="Category Title"
          />
        </div>
        <button
          className="border-none bg-green w-full text-[21px] font-semibold rounded-[10px] p-[10px] text-white"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
export default AddCategoryForm;
