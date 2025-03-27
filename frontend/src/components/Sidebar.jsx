import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function Sidebar({ categories }) {
  return (
    <div className="w-full ml-0 lg:flex-[3] lg:ml-5 ">
      <h5 className="text-primary text-center p-[5px] text-2xl border-t border-primary border-b">
        CATEGORIES
      </h5>
      <ul className="p-[10px]">
        {categories?.map((category) => (
          <Link
            className="my-[15px] mx-0 text-[17px] font-medium text-primary bg-[#AAA8A8] text-center p-[5px] relative capitalize block [clip-path:polygon(100%_0,100%_50%,100%_100%,5%_100%,0_50%,5%_0)] hover:bg-pumpkin hover:text-white after:content-[''] after:w-[7px] after:h-[7px] after:rounded-full after:absolute after:left-[15px] after:top-0 after:bottom-0 after:m-auto after:bg-white sm:after:left-[18px] "
            to={`/posts/categories/${category?.title}`}
            key={category?._id}
          >
            {category?.title}
          </Link>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
