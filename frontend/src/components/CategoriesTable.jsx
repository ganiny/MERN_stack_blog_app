import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";

function CategoriesTable() {
  const deleteCategoryHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Category has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Category is safe!");
      }
    });
  };
  return (
    <section className="flex h-[calc(100vh-130px)] overflow-hidden">
      <AdminSidebar />
      <div className="flex-[10] p-[2px] sm:p-[15px] md:p-5 overflow-y-scroll">
        <h1 className="text-3xl text-secondary mb-[15px] border-b-2 border-secondary pb-[3px] w-max">
        Categories
        </h1>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th>Count</th>
              <th>Category Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map((item) => (
              <tr key={item}>
                <td>{item}</td>
                <td>
                  <b>music</b>
                </td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button
                      onClick={deleteCategoryHandler}
                      className="w-full md:w-fit my-[10px] md:my-0 mx-0 border-none bg-red hover:bg-[red] text-white rounded-[5px] text-[17px] font-medium p-[5px]"
                    >
                      Delete Category
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
export default CategoriesTable;
