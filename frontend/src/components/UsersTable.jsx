import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllUsersProfiles } from "../redux/apiCalls/profileApiCalls";
import { useEffect } from "react";

function UsersTable() {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(()=>{
      dispatch(getAllUsersProfiles());
    },[isProfileDeleted]);

  const deleteUserHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteProfile(userId))
      } else {
        swal("User is safe!");
      }
    });
  };
  return (
    <section className="flex h-[calc(100vh-130px)] overflow-hidden">
      <AdminSidebar />
      <div className="flex-[10] p-[2px] sm:p-[15px] md:p-5 overflow-y-scroll">
        <h1 className="text-3xl text-secondary mb-[15px] border-b-2 border-secondary pb-[3px] w-max">
          Users
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => (
              <tr key={profile?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex flex-col md:flex-row items-center justify-start">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={profile?.profilePhoto?.url}
                      alt="profile photo"
                    />
                    <span className="font-medium text-center text-[17px] ml-[5px]">
                      {profile?.username}
                    </span>
                  </div>
                </td>
                <td>{profile?.email}</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-green hover:bg-[green] text-white rounded-[5px] text-[17px] font-medium p-[5px]">
                      <Link className="text-white" to={`/profile/${profile?._id}`}>
                        View Profile
                      </Link>
                    </button>
                    <button
                      onClick={()=>deleteUserHandler(profile?._id)}
                      className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-red hover:bg-[red] text-white rounded-[5px] text-[17px] font-medium p-[5px]"
                    >
                      Delete User
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
export default UsersTable;
