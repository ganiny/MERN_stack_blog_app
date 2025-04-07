import { Link, useParams } from "react-router-dom";
import PostList from "../components/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../redux/apiCalls/postsApiCalls";

function CategoryPage() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const postsBasedOnCategory = useSelector(
    (state) => state.posts?.postsBasedOnCategory
  );

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="min-h-[calc(100vh-130px)] p-5 ">
      {postsBasedOnCategory?.length === 0 ? (
        <>
          <h1 className="my-[20px] mx-0 text-dark text-3xl">
            There are no posts based on <span className="text-red capitalize">{category}</span> category
          </h1>
          <Link className="text-[21px] underline font-medium" to={"/posts"}>Go to posts page</Link>
        </>
      ) : (
        <>
          <h1 className="mb-[15px] text-primary pb-[5px] border-b-2 border-gray text-3xl w-max font-medium">
            Posts based on <span className="text-greenSea capitalize">{category}</span> category
          </h1>
          <PostList posts={postsBasedOnCategory} />
        </>
      )}
    </section>
  );
}
export default CategoryPage;
