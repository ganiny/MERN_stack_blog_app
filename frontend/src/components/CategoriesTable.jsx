import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteCategory,
  fetchCategories,
} from "../redux/apiCalls/categoriesApiCalls";

function CategoriesTable() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this category!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(categoryId));
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
            {categories?.map((category, index) => (
              <tr key={category?._id}>
                <td>{index + 1}</td>
                <td>
                  <b className="capitalize">{category?.title}</b>
                </td>
                <td>
                  <div className="flex flex-wrap md:flex-nowrap items-center justify-around">
                    <button
                      onClick={() => deleteCategoryHandler(category?._id)}
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
