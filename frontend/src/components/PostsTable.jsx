import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { posts } from "../dummyData";

function PostsTable() {
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Post has been deleted!", {
          icon: "success",
        });
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
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col md:flex-row items-center justify-start">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="/images/user-avatar.png"
                      alt=""
                    />
                    <span className="font-medium text-center text-[17px] ml-[5px]">
                      {item.user.username}
                    </span>
                  </div>
                </td>
                <td className="">{item.title}</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-green hover:bg-[green] text-white rounded-[5px] text-[17px] font-medium p-[5px]">
                      <Link className="text-white" to={`/posts/details/${item._id}`}>
                        View Post
                      </Link>
                    </button>
                    <button
                      onClick={deletePostHandler}
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
