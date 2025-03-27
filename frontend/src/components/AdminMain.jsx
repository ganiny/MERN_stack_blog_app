import { Link } from "react-router-dom";
import AddCategoryForm from "./AddCategoryForm";

function AdminMain() {
  return (
    <div className="flex-[10] p-[10px]">
      <div className="flex items-center justify-between flex-wrap mb-[30px] pb-[15px] border-b-2 border-gray">
        <div className="border-2 border-gray w-full md:w-[44%] lg:w-[26%] xl:w-[22%] m-[5px] mb-[10px] p-[10px] rounded-[10px]">
          <h5 className="text-[21px] font-medium text-gray">Users</h5>
          <div className="text-red text-2xl font-semibold my-[5px] mx-0">
            120
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="text-[17px] bg-greenSea p-[5px] rounded-[10px] font-medium text-white"
              to={"/admin-dashboard/users-table"}
            >
              See all users
            </Link>
            <div className="w-[35px] h-[35px] rounded-[10px] bg-secondary flex items-center justify-center text-2xl text-white">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray w-full md:w-[44%] lg:w-[26%] xl:w-[22%] m-[5px] mb-[10px] p-[10px] rounded-[10px]">
          <h5 className="text-[21px] font-medium text-gray">Posts</h5>
          <div className="text-red text-2xl font-semibold my-[5px] mx-0">
            210
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="text-[17px] bg-greenSea p-[5px] rounded-[10px] font-medium text-white"
              to={"/admin-dashboard/posts-table"}
            >
              See all posts
            </Link>
            <div className="w-[35px] h-[35px] rounded-[10px] bg-secondary flex items-center justify-center text-2xl text-white">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray w-full md:w-[44%] lg:w-[26%] xl:w-[22%] m-[5px] mb-[10px] p-[10px] rounded-[10px]">
          <h5 className="text-[21px] font-medium text-gray">Categories</h5>
          <div className="text-red text-2xl font-semibold my-[5px] mx-0">
            10
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="text-[17px] bg-greenSea p-[5px] rounded-[10px] font-medium text-white"
              to={"/admin-dashboard/categories-table"}
            >
              See all categories
            </Link>
            <div className="w-[35px] h-[35px] rounded-[10px] bg-secondary flex items-center justify-center text-2xl text-white">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="border-2 border-gray w-full md:w-[44%] lg:w-[26%] xl:w-[22%] m-[5px] mb-[10px] p-[10px] rounded-[10px]">
          <h5 className="text-[21px] font-medium text-gray">Comments</h5>
          <div className="text-red text-2xl font-semibold my-[5px] mx-0">
            44
          </div>
          <div className="flex items-center justify-between">
            <Link
              className="text-[17px] bg-greenSea p-[5px] rounded-[10px] font-medium text-white"
              to={"/admin-dashboard/comments-table"}
            >
              See all comments
            </Link>
            <div className="w-[35px] h-[35px] rounded-[10px] bg-secondary flex items-center justify-center text-2xl text-white">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  );
}
export default AdminMain;
