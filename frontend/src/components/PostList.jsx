/* eslint-disable react/prop-types */
import PostItem from "./PostItem";

function PostList({ posts }) {
  return (
    <div className="flex items-center justify-between flex-wrap flex-[9]">
      {posts?.map((item) => (
        <PostItem post={item} key={item._id} />
      ))}
    </div>
  );
}
export default PostList;
