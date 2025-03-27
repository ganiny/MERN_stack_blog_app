/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import PostList from "../components/PostList";
import Sidebar from "../components/Sidebar";
import { categories } from "../dummyData";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../redux/apiCalls/postsApiCalls";

const POSTS_PER_PAGE = 3;

function PostsPage() {
  const dispatch = useDispatch();
  const postsCount = useSelector(state => state.posts?.postsCount);
  const posts = useSelector(state => state.posts?.posts);
  

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount/POSTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [currentPage]);
  
  useEffect(() => {
    dispatch(getPostsCount());
  }, []);
  return (
    <>
      <section className="pt-5 sm:px-[15px] lg:px-[30px] flex flex-col lg:flex-row items-center lg:items-start">
        <PostList posts={posts} />
        <Sidebar categories={categories} />
      </section>
      <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </>
  );
}
export default PostsPage;
