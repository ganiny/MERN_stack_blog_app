import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import swal from "sweetalert";
import UpdateProfileModal from "../components/UpdateProfileModal";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProfile,
  getUserProfile,
  uploadProfilePhoto,
} from "../redux/apiCalls/profileApiCalls";
import PostItem from "../components/PostItem";
import { MoonLoader } from "react-spinners";
import { logoutUser } from "../redux/apiCalls/authApiCalls";

function ProfilePage() {
  const [file, setFile] = useState(null);
  const [updateProfile, setUpdateProfile] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { profile, loading, isProfileDeleted } = useSelector(
    (state) => state.profile
  );
  const user = useSelector((state) => state.auth.user?.userWithoutPassword);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);
  
  useEffect(() => {
    if(isProfileDeleted){
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!file) return toast.warning("There is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      } else {
        swal("Account is safe!");
      }
    });
  };

  if(loading){
    return(
      <div className="min-h-[calc(100vh-130px)] w-full my-5 mx-0 flex items-center justify-center">
        <MoonLoader size={120}/>
      </div>
    )
  }

  return (
    <section className="min-h-[calc(100vh-130px)] p-[15px] lg:p-[30px]">
      <div className="w-full h-fit p-4 flex items-center justify-center flex-col bg-primary">
        <div className="w-[120px] h-[120px] relative text-center">
          <img
            className="w-full h-full rounded-full object-cover"
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt=""
          />
          {user?._id === profile?._id && (
            <form onSubmit={formSubmitHandler}>
              <abbr title="choose profile photo">
                <label
                  htmlFor="file"
                  className="bi bi-camera-fill text-primary bg-[#eee] border border-primary rounded-full py-0 px-[5px] absolute bottom-[-5px] right-[-5px] m-auto w-max cursor-pointer z-10 text-[25px]"
                ></label>
              </abbr>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                type="file"
                name="file"
                id="file"
              />
              <button
                className="text-dark bg-[#eee] border border-primary rounded-[5px] py-0 px-[5px] absolute bottom-[-5px] right-[-65px] m-auto w-max z-10 text-[14px] font-bold"
                type="submit"
              >
                Upload
              </button>
            </form>
          )}
        </div>
        <h1 className="text-3xl text-white my-[10px] mx-0">
          {profile?.username}
        </h1>
        <p className="text-lg font-medium text-main my-[10px] mx-0 text-center">
          {profile?.bio}
        </p>
        <div>
          <strong className="text-gray text-[17px]">Joined In: </strong>
          <span className="text-greenSea text-[15px] font-medium">
            {new Date(profile?.createdAt).toDateString()}
          </span>
        </div>
        {user?._id === profile?._id && (
          <button
            onClick={() => setUpdateProfile(true)}
            className="text-[21px] font-medium bg-green text-white border-none py-[5px] px-[10px] rounded-[10px] mt-5"
          >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="w-full lg:w-[800px] my-5 mx-auto">
        <h2 className="mb-5 py-[5px] px-0 text-[40px] text-primary border-b-2 border-primary">
          {`${profile?.username}'s`} Posts
        </h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post?._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>
      {user?._id === profile?._id && (
        <button
          onClick={deleteAccountHandler}
          className="bg-white text-red p-[5px] border border-red text-lg font-medium"
        >
          Delete Account
        </button>
      )}
      {updateProfile && (
        <UpdateProfileModal
          profile={profile}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </section>
  );
}
export default ProfilePage;
