import { Link, useParams } from "react-router-dom";
import { posts } from "../dummyData";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "../components/UpdatePostModal";

function PostDetailsPage() {
  const { id } = useParams();
  const post = posts.find((item) => item._id === parseInt(id));

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("There is no file!");

    toast.success("Image uploaded successfully!");
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
        swal("Post has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Post is safe!");
      }
    });
  };

  return (
    <section className="w-full lg:w-[800px] m-auto p-[15px] lg:p-5">
      <div className="h-[400px] mb-10 flex flex-col items-center">
        <img
          className="w-full h-full object-contain mb-2"
          src={file ? URL.createObjectURL(file) : post?.image}
          alt=""
        />
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
      </div>
      <h1 className="text-center text-[40px] text-primary capitalize my-[10px] mx-0">
        {post?.title}
      </h1>
      <div className="flex items-center justify-center my-5 mx-0">
        <img
          className="w-[70px] h-[70px] rounded-full object-cover"
          src={post?.user?.image}
          alt=""
        />
        <div className="flex flex-col ml-[15px]">
          <strong className="text-[21px] text-dark">
            <Link to={"/profile/1"}>{post?.user?.username}</Link>
          </strong>
          <span className="font-medium text-sm text-gray">
            {post?.createdAt}
          </span>
        </div>
      </div>
      <p className="text-[21px] leading-[1.8] text-primary">
        {post?.description}
        {": "}
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
        perferendis officia nisi quis dolor dignissimos esse dicta est,
        similique ex tempora, eius distinctio facilis quaerat exercitationem,
        voluptas laudantium voluptate magni! Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Eos perferendis officia nisi quis dolor
        dignissimos esse dicta est, similique ex tempora, eius distinctio
        facilis quaerat exercitationem, voluptas laudantium voluptate magni!
      </p>
      <div className="my-[15px] mx-0 text-[27px] flex items-center justify-between text-blue">
        <div>
          <i className="bi bi-hand-thumbs-up cursor-pointer"></i>
          <small>{post?.likes?.length} likes</small>
        </div>
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
      </div>
      <AddComment />
      <CommentList />
      {updatePost && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}
    </section>
  );
}
export default PostDetailsPage;
