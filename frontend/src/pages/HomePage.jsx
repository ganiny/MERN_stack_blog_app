/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/apiCalls/postsApiCalls";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts(1));
    window.scrollTo(0, 0);
  }, []);

  const posts = useSelector((state) => state.posts?.posts);
  return (
    <section className="min-h-[calc(100vh-130px)]">
      {/* Hero Section */}
      <div className="bg-[url(/src/images/retrosupply-jLwVAUtLOAQ-unsplash.jpg)] bg-cover bg-top bg-no-repeat h-[400px] w-full relative mb-10">
        <div className="flex items-center justify-center absolute z-[2] top-0 right-0 w-full h-full bg-[#00000033]">
          <h1 className="text-[30px] lg:text-[40px] bg-main py-[10px] px-[17px] text-center rounded-[21px] text-dark border-2 border-green font-bold">
            Welcome To Blog
          </h1>
        </div>
      </div>

      <div className="ml-[15px] lg:ml-[30px] pb-[5px] text-[30px] font-bold text-dark w-max mb-5 border-b-2 border-dark">
        Latest Posts
      </div>
      <div className="py-0 sm:px-[15px] lg:px-[30px] flex flex-col lg:flex-row items-center lg:items-start">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="py-0 px-[30px] my-[15px] mx-0">
        <Link
          className="w-full rounded-[5px] p-[10px] text-[21px] bg-dark text-white font-medium block border-none text-center"
          to={"/posts"}
        >
          Show All Posts
        </Link>
      </div>
    </section>
  );
}
export default HomePage;
