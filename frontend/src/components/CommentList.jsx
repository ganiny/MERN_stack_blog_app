/* eslint-disable react/prop-types */
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../redux/apiCalls/commentsApiCalls";

function CommentList({ comments }) {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const user = useSelector((state) => state.auth?.user?.userWithoutPassword);

  const dispatch = useDispatch();

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

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
    <div className="p-[5px] rounded-[5px] my-[10px] mx-0">
      <h4 className="text-[30px] text-dark border-b border-dark pb-[5px] mb-5">
        {comments?.length} Comments
      </h4>
      {comments?.map((comment) => (
        <div
          className="p-[7px] border border-gray rounded-[5px] mt-[15px]"
          key={comment?._id}
        >
          <div className="flex items-start justify-between">
            <div className="text-[21px] font-bold text-primary capitalize">
              {comment?.username}
            </div>
            <div className="text-[15px] font-medium text-pumpkin">
              {moment(comment?.createdAt).fromNow()}
            </div>
          </div>
          <p className="p-[10px] text-dark text-[17px]">{comment?.text}</p>
          {(user?._id === comment?.user) && (
            <div className="p-[10px] text-lg">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square text-greenSea mr-[15px] cursor-pointer"
              ></i>
              <i
                onClick={()=>deleteCommentHandler(comment?._id)}
                className="bi bi-trash-fill text-red cursor-pointer"
              ></i>
            </div>
          )}
        </div>
      ))}
      {updateComment && (
        <UpdateCommentModal commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment} />
      )}
    </div>
  );
}
export default CommentList;
