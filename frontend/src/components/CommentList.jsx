import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";

function CommentList() {
  const [updateComment, setUpdateComment] = useState(false);
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
    <div className="p-[5px] rounded-[5px] my-[10px] mx-0">
      <h4 className="text-[30px] text-dark border-b border-dark pb-[5px] mb-5">
        2 Comments
      </h4>
      {[1, 2].map((comment) => (
        <div
          className="p-[7px] border border-gray rounded-[5px] mt-[15px]"
          key={comment}
        >
          <div className="flex items-start justify-between">
            <div className="text-[21px] font-bold text-primary capitalize">
              Mohamed Abubakr
            </div>
            <div className="text-[15px] font-medium text-pumpkin">
              2 hours ago
            </div>
          </div>
          <p className="p-[10px] text-dark text-[17px]">
            Hello, this is amazing
          </p>
          <div className="p-[10px] text-lg">
            <i
              onClick={() => setUpdateComment(true)}
              className="bi bi-pencil-square text-greenSea mr-[15px] cursor-pointer"
            ></i>
            <i
              onClick={deleteCommentHandler}
              className="bi bi-trash-fill text-red cursor-pointer"
            ></i>
          </div>
        </div>
      ))}
      {updateComment && <UpdateCommentModal setUpdateComment={setUpdateComment}/>}
    </div>
  );
}
export default CommentList;
