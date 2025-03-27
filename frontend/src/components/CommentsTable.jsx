import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";

function CommentsTable() {
  const deleteCommentHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Comment has been deleted!", {
          icon: "success",
        });
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
            {[1,2,3].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <div className="flex flex-col md:flex-row items-center justify-start">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src="/images/user-avatar.png"
                      alt=""
                    />
                    <span className="font-medium text-center text-[17px] ml-[5px]">
                      Mohamed Abubakr
                    </span>
                  </div>
                </td>
                <td className="">Thanks for this post</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button
                      onClick={deleteCommentHandler}
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
