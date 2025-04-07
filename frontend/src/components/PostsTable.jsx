import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deletePost, fetchAllPosts } from "../redux/apiCalls/postsApiCalls";

function PostsTable() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      } else {
        swal("Post is safe!");
      }
    });
  };
  return (
    <section className="flex h-[calc(100vh-130px)] overflow-hidden">
      <AdminSidebar />
      <div className="flex-[10] p-[2px] sm:p-[15px] md:p-5 overflow-y-scroll">
        <h1 className="text-3xl text-secondary mb-[15px] border-b-2 border-secondary pb-[3px] w-max">
          Posts
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Post Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post, index) => (
              <tr key={post?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col md:flex-row items-center justify-start">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={post?.user?.profilePhoto?.url}
                      alt="profile photo"
                    />
                    <span className="font-medium text-center text-[17px] ml-[5px]">
                      {post?.user?.username}
                    </span>
                  </div>
                </td>
                <td className="">{post?.title}</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-green hover:bg-[green] text-white rounded-[5px] text-[17px] font-medium p-[5px]">
                      <Link
                        className="text-white"
                        to={`/posts/details/${post?._id}`}
                      >
                        View Post
                      </Link>
                    </button>
                    <button
                      onClick={() => deletePostHandler(post?._id)}
                      className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-red hover:bg-[red] text-white rounded-[5px] text-[17px] font-medium p-[5px]"
                    >
                      Delete Post
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default PostsTable;
