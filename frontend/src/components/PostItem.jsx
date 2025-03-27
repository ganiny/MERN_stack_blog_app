/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function PostItem({ post }) {
  return (
    <div className="w-full bg-[#f4f4f4] mb-10 p-[10px] md:p-[15px] rounded-[5px] flex flex-col items-start justify-between border border-[#b7b3b3]">
      <div className="w-full mb-[15px]">
        <img
          className="w-full h-[300px] md:h-[600px] object-contain rounded-[5px]"
          src={post?.image.url}
          alt="Post Image"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between m-[5px] border-b border-gray pb-[5px]">
          <div>
            <strong className="text-greenSea text-lg">Author: </strong>
            <Link
              className="text-[17px] font-medium text-primary capitalize"
              to={`/profile/${post?.user?._id}`}
            >
              {post?.user?.username}
            </Link>
          </div>
          <div className="font-bold text-sm text-greenSea">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="flex items-center justify-between p-[5px]">
          <h4 className="text-primary text-center text-[25px] font-bold capitalize">
            {post?.title}
          </h4>
          <Link
            className="bg-pumpkin text-white py-[2px] px-[7px] rounded-[15px] text-[15px] font-bold"
            to={`/posts/categories/${post?.category}`}
          >
            {post?.category}
          </Link>
        </div>
        <p className="text-[17px] leading-[1.9] text-secondary font-medium p-[5px] my-[10px] mx-0 overflow-hidden line-clamp-2">
          {post?.description}
          {": "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe,
          impedit quibusdam quaerat itaque amet, modi voluptatibus incidunt
          blanditiis, temporibus dolor ducimus rerum quisquam consequatur
          debitis facilis maxime molestias laudantium quod?
        </p>
        <Link
          className="bg-green text-white w-full block text-center text-[21px] rounded-[5px] p-[5px]"
          to={`/posts/details/${post?._id}`}
        >
          Read More...
        </Link>
      </div>
    </div>
  );
}
export default PostItem;
