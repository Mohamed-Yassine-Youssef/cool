import React from "react";
const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="paginationpage">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            style={{
              margin: "0 10px",
              background: "transparent",
              borderStyle: "solid",
              color: "white",
              borderColor: "white",
              padding: " 0 10px",
            }}
            className={page === currentPage ? "activebtn" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
