import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchAllComments } from "../redux/apiCalls/commentsApiCalls";
import { useEffect } from "react";

function CommentsTable() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comments);

  useEffect(()=>{
      dispatch(fetchAllComments());
    },[]);

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteComment(commentId));
      } else {
        swal("Comment is safe!");
      }
    });
  };
  return (
    <section className="flex h-[calc(100vh-130px)] overflow-hidden">
      <AdminSidebar />
      <div className="flex-[10] p-[2px] sm:p-[15px] md:p-5 overflow-y-scroll">
        <h1 className="text-3xl text-secondary mb-[15px] border-b-2 border-secondary pb-[3px] w-max">
          Comments
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((comment, index) => (
              <tr key={comment?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col md:flex-row items-center justify-start">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={comment?.user?.profilePhoto?.url}
                      alt="profile photo"
                    />
                    <span className="font-medium text-center text-[17px] ml-[5px]">
                      {comment?.user?.username}
                    </span>
                  </div>
                </td>
                <td>{comment?.text}</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button
                      onClick={()=>deleteCommentHandler(comment?._id)}
                      className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-red hover:bg-[red] text-white rounded-[5px] text-[17px] font-medium p-[5px]"
                    >
                      Delete Comment
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
export default CommentsTable;
