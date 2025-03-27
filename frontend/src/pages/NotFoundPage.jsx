import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="w-full h-[calc(100vh-130px)] flex items-center justify-center flex-col">
      <div className="text-[70px] font-bold text-red">404</div>
      <h1 className="text-3xl text-primary mb-[30px]">Page Not Found</h1>
      <Link
        className="block text-white bg-secondary text-[21px] font-medium py-[5px] px-[10px] rounded-[5px] hover:bg-primary"
        to={"/"}
      >
        Go to home page
      </Link>
    </section>
  );
}
export default NotFoundPage;
