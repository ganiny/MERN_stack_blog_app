import { Link } from "react-router-dom"

function AdminSidebar() {
  return (
    <div className="hidden lg:block flex-[2] p-5 border-r border-gray">
        <Link to={"/admin-dashboard"} className="text-2xl font-bold text-primary mb-[30px] block">
            <i className="bi bi-columns mr-[5px] text-green"></i>
            Dashboard
        </Link>
        <ul className="p-[5px]">
            <Link to={"/admin-dashboard/users-table"} className="text-secondary text-[21px] font-semibold mb-5 block">
                <i className="bi bi-person mr-[5px] text-2xl"></i>
                Users
            </Link>
            <Link to={"/admin-dashboard/posts-table"} className="text-secondary text-[21px] font-semibold mb-5 block">
                <i className="bi bi-file-post mr-[5px] text-2xl"></i>
                Posts
            </Link>
            <Link to={"/admin-dashboard/categories-table"} className="text-secondary text-[21px] font-semibold mb-5 block">
                <i className="bi bi-tag-fill mr-[5px] text-2xl"></i>
                Categories
            </Link>
            <Link to={"/admin-dashboard/comments-table"} className="text-secondary text-[21px] font-semibold mb-5 block">
                <i className="bi bi-chat-left-text mr-[5px] text-2xl"></i>
                Comments
            </Link>
        </ul>
    </div>
  )
}
export default AdminSidebar