/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "../components/UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  togglePostLikes,
  updatePostImage,
} from "../redux/apiCalls/postsApiCalls";

function PostDetailsPage() {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.posts);
  const user = useSelector((state) => state.auth?.user?.userWithoutPassword);
  const isUserIsThePostOwner = post?.user?._id === user?._id;

  const { id } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
    window.scrollTo(0, 0);
  }, [id]);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(updatePostImage(formData, post?._id));
  };

  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      } else {
        swal("Post is safe!");
      }
    });
  };

  return (
    <section className="min-h-[calc(100vh-130px)] w-full lg:w-[800px] m-auto p-[15px] lg:p-5">
      <div className="h-[400px] mb-10 flex flex-col items-center">
        <img
          className="w-full h-full object-contain mb-2"
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt="Post Image"
        />
        {isUserIsThePostOwner && (
          <form onSubmit={updateImageSubmitHandler}>
            <label
              className="text-sm font-bold text-blue cursor-pointer"
              htmlFor="file"
            >
              <i className="bi bi-image-fill text-[21px] mr-[3px]"></i>
              Select new image
            </label>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
            />
            <button
              className="ml-[10px] bg-secondary text-main border border-blue rounded-[5px] text-[17px] py-[2px] px-[5px]"
              type="submit"
            >
              upload
            </button>
          </form>
        )}
      </div>
      <h1 className="text-center text-[40px] text-primary capitalize my-[10px] mx-0">
        {post?.title}
      </h1>
      <div className="flex items-center justify-center my-5 mx-0">
        <img
          className="w-[70px] h-[70px] rounded-full object-cover"
          src={post?.user?.profilePhoto.url}
          alt="User Image"
        />
        <div className="flex flex-col ml-[15px]">
          <strong className="text-[21px] text-dark">
            <Link to={`/profile/${post?.user._id}`}>
              {post?.user?.username}
            </Link>
          </strong>
          <span className="font-medium text-sm text-gray">
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
      </div>
      <p className="text-[21px] leading-[1.8] text-primary">
        {post?.description}
      </p>
      <div className="my-[15px] mx-0 text-[27px] flex items-center justify-between text-blue">
        <div>
          {user && (
            <i
              onClick={() => dispatch(togglePostLikes(post?._id))}
              className={`${
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              } cursor-pointer`}
            ></i>
          )}
          <small>{post?.likes?.length} likes</small>
        </div>
        {isUserIsThePostOwner && (
          <div>
            <i
              onClick={() => setUpdatePost(true)}
              className="bi bi-pencil-square text-greenSea mr-[15px] cursor-pointer"
            ></i>
            <i
              onClick={deletePostHandler}
              className="bi bi-trash-fill text-red cursor-pointer"
            ></i>
          </div>
        )}
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="text-[17px] text-gray">To write a comment, you must login first</p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
}
export default PostDetailsPage;
