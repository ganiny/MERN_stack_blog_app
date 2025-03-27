import { Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";

function UsersTable() {
  const deleteUserHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("User has been deleted!", {
          icon: "success",
        });
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
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
                <td className="">gen2022eg@gmail.com</td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-green hover:bg-[green] text-white rounded-[5px] text-[17px] font-medium p-[5px]">
                      <Link className="text-white" to={"/profile/1"}>
                        View Profile
                      </Link>
                    </button>
                    <button
                      onClick={deleteUserHandler}
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
