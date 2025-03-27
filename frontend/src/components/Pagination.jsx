function Pagination({ pages, currentPage, setCurrentPage }) {
  let generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    generatedPages.push(i);
  }
  return (
    <div className="flex items-center justify-center p-[5px] mb-5">
      <button
        onClick={() => setCurrentPage((current) => current - 1)}
        disabled={currentPage === 1}
        className="disabled:cursor-not-allowed disabled:text-gray rounded-s-[10px] w-max h-10 py-0 px-[7px] border border-gray flex items-center justify-center text-xl font-bold text-dark cursor-pointer"
      >
        Previous
      </button>
      {generatedPages.map((page) => (
        <div
          onClick={() => setCurrentPage(page)}
          className={`w-10 h-10  border border-gray flex items-center justify-center text-xl font-bold text-dark cursor-pointer ${
            currentPage === page ? "bg-gray" : ""
          }`}
          key={page}
        >
          {page}
        </div>
      ))}
      <button
        onClick={() => setCurrentPage((current) => current + 1)}
        disabled={currentPage === pages}
        className="disabled:cursor-not-allowed disabled:text-gray rounded-e-[10px] w-max h-10 py-0 px-[7px] border border-gray flex items-center justify-center text-xl font-bold text-dark cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
export default Pagination;
