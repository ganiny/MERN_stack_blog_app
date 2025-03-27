import { useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../redux/apiCalls/postsApiCalls";

function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const postsBasedOnCategory = useSelector((state) => state.posts?.postsBasedOnCategory);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="min-h-[calc(100vh-130px)] p-5 ">
      <h1 className="mb-[15px] text-primary pb-[5px] border-b-2 border-gray text-3xl w-max font-medium">
        Posts based on {category}
      </h1>
      <PostList posts={postsBasedOnCategory} />
    </section>
  );
}
export default CategoryPage;
