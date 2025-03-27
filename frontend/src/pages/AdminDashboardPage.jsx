import AdminMain from "../components/AdminMain";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboardPage() {
  return (
    <section className="flex overflow-hidden w-full min-h-[calc(100vh-130px)]">
      <AdminSidebar />
      <AdminMain />
    </section>
  );
}
export default AdminDashboardPage;
